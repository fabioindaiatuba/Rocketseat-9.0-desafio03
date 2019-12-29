import * as Yup from 'yup';
import { parseISO, addMonths, startOfDay, endOfDay, isPast } from 'date-fns';

import Mail from '../../lib/Mail';

import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

class RegistratonController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      order: ['start_date'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });
    return res.json(registrations);
  }

  async store(req, res) {
    const Schema = Yup.object().shape({
      start_date: Yup.string().required(),
      student_id: Yup.number()
        .required()
        .integer(),
      plan_id: Yup.number()
        .required()
        .integer(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { start_date: date, student_id, plan_id } = req.body;
    const start_date = startOfDay(parseISO(date));

    if (isPast(endOfDay(start_date))) {
      return res.json({ error: 'Incorrect start date.' });
    }

    const isStudent = await Student.findByPk(student_id);

    if (!isStudent) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const isPlan = await Plan.findByPk(plan_id);

    if (!isPlan) {
      return res.status(401).json({ error: 'Plan not found' });
    }

    const { duration, price: planPrice } = isPlan;
    const end_date = addMonths(start_date, duration);
    const price = duration * planPrice;

    const registration = await Registration.create({
      start_date,
      end_date,
      price,
      student_id,
      plan_id,
    });

    await Mail.sendMail({
      to: `${isStudent.name} <${isStudent.email}>`,
      subject: 'Matrícula efetuada',
      text:
        'Sua matricula foi realizada com sucesso na GymPoint. Seja bem-vindo!',
    });

    return res.json(registration);
  }

  async update(req, res) {
    const Schema = Yup.object().shape({
      start_date: Yup.string(),
      student_id: Yup.number().integer(),
      plan_id: Yup.number().integer(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const registration = await Registration.findByPk(req.params.id);
    if (!registration) {
      return res.status(401).json({ error: 'Registration not found' });
    }

    const student_id = req.body.student_id || registration.student_id;
    const plan_id = req.body.plan_id || registration.plan_id;
    const date = req.body.start_date
      ? parseISO(req.body.start_date)
      : new Date(registration.start_date);

    const start_date = startOfDay(date);

    if (isPast(endOfDay(start_date))) {
      return res.json({ error: 'Incorrect start date.' });
    }

    const isStudent = await Student.findByPk(student_id);

    if (!isStudent) {
      return res.status(401).json({ error: 'Student not found' });
    }

    const isPlan = await Plan.findByPk(plan_id);

    if (!isPlan) {
      return res.status(401).json({ error: 'Plan not found' });
    }

    const { duration, price: planPrice } = isPlan;
    const end_date = addMonths(start_date, duration);
    const price = duration * planPrice;

    registration.update({
      start_date,
      end_date,
      price,
      student_id,
      plan_id,
    });

    return res.json(registration);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) {
      return res.status(401).json({ error: 'Registration not found' });
    }

    await registration.destroy();

    return res.send();
  }
}

export default new RegistratonController();
