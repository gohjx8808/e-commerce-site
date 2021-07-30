import sgMail from '@sendgrid/mail';
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

sgMail.setApiKey(process.env.GATSBY_SENDGRID_API_KEY!);

const sendPaymentEmail = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
  const postData:products.submitShippingInfoPayload = req.body;

  const msg = {
    to: postData.email,
    from: 'yj.artjournal@gmail.com',
    templateId: 'd-ce30ae1412f546d592d214d4fc8efa90',
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
};

export default sendPaymentEmail;
