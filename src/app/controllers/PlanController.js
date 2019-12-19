import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
      order: ['duration'],
    });
    return res.json(plans);
  }

  async store(req, res) {
    const Schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .required()
        .min(1)
        .integer(),
      price: Yup.number()
        .required()
        .min(0),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plan.create(req.body);
    return res.json(plan);
  }

  async update(req, res) {
    const Schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number()
        .min(1)
        .integer(),
      price: Yup.number(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan not found' });
    }

    const { id, title, duration, price } = await plan.update(req.body);
    return res.json({ id, title, duration, price });
  }

  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new PlanController();
