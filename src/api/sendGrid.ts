import sgMail from '@sendgrid/mail';
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

export default async function sendEmail(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
  sgMail.setApiKey(process.env.GATSBY_SENDGRID_API_KEY!);

  const postData:products.submitShippingInfoPayload = req.body;

  const msg = {
    to: postData.email,
    from: 'yj.artjournal@gmail.com',
    templateId: 'd-42bce563a8cc4a00b44c787c32a0cb23',
    dynamic_template_data: {
      name: postData.fullName,
    },
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ msg: 'Message sent successfully' });
  } catch (e) {
    return res.status(e.code).json({ msg: e.message });
  }
}
