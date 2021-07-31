import sgMail from '@sendgrid/mail';
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { formatPrice } from '../../utils/helper';

sgMail.setApiKey(process.env.GATSBY_SENDGRID_API_KEY!);

interface paymentMap{
  [key:string]:string
}

const sendPaymentEmail = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
  const postData:products.sendEmailPayload = req.body;

  const paymentTemplate = {
    bankTransfer: 'd-ce30ae1412f546d592d214d4fc8efa90',
    TNG: 'd-13380bdf16624fb6bf11c56450dde78d',
  } as paymentMap;

  const paymentEmail = {
    to: postData.email,
    bcc: 'piggy.chiah@gmail.com',
    from: 'yj.artjournal@gmail.com',
    templateId: paymentTemplate[postData.paymentOptions],
    dynamic_template_data: {
      customer_name: postData.fullName,
      checkoutItems: postData.selectedCheckoutItems,
      shippingFee: formatPrice(postData.shippingFee, 'MYR'),
      totalAmount: formatPrice(postData.totalAmount, 'MYR'),
    },
  };

  const receiptEmail = {
    to: 'piggy.chiah@gmail.com',
    from: 'yj.artjournal@gmail.com',
    templateId: 'd-178070cfd5484d9298f0c21efde0c44b',
    dynamic_template_data: {
      order_code: `YJ${String(postData.currentOrderCount).padStart(4, '0')}`,
      customer_name: postData.fullName,
      phoneNo: postData.phoneNo,
      address_line_1: postData.addressLine1,
      address_line_2: postData.addressLine2,
      postcode: postData.postcode,
      city: postData.city,
      state: postData.state,
      country: postData.country,
      checkoutItems: postData.selectedCheckoutItems,
      shippingFee: formatPrice(postData.shippingFee, 'MYR'),
      totalAmount: formatPrice(postData.totalAmount, 'MYR'),
    },
  };

  try {
    // await sgMail.send(paymentEmail);
    await sgMail.send(receiptEmail);
    return res.status(200).json({ msg: 'Message sent successfully' });
  } catch (e) {
    return res.status(e.code).json({ msg: e.message });
  }
};

export default sendPaymentEmail;
