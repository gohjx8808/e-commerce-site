import sgMail from '@sendgrid/mail';
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

sgMail.setApiKey(process.env.GATSBY_SENDGRID_API_KEY!);

const sendFeedbackEmail = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
  const postData:feedback.submitFeedbackFormPayload = req.body;

  const email = [{
    to: 'yj.artjournal@gmail.com',
    from: 'piggy.chiah@gmail.com',
    templateId: 'd-3712d484569b41f18e1525a602254adf',
    dynamic_template_data: {
      nickname: postData.nickname,
      email: postData.email,
      feedback: postData.feedback,
    },
  }];

  try {
    await sgMail.send(email);
    return res.status(200).json({ msg: 'Feedback email sent successfully' });
  } catch (e) {
    return res.status(e.code).json({ msg: e.message });
  }
};

export default sendFeedbackEmail;
