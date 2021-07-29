import sgMail from '@sendgrid/mail';
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

export default async function sendEmail(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
  sgMail.setApiKey(process.env.GATSBY_SENDGRID_API_KEY!);

  const msg = {
    to: 'gohjx8808@gmail.com',
    from: 'yj.artjournal@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ msg: 'Message sent successfully' });
  } catch (e) {
    return res.status(e.code).json({ msg: e.message });
  }
}
