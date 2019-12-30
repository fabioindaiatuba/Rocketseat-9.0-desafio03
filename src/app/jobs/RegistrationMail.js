import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { student, plan, end_date, price } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula efetuada',
      template: 'registration',
      context: {
        student: student.name,
        plan: plan.title,
        endDate: format(parseISO(end_date), "dd 'de' MMMM 'de' yyyy '.'", {
          locale: pt,
        }),
        price,
      },
    });
  }
}

export default new RegistrationMail();
