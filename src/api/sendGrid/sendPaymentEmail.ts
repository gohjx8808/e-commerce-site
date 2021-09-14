import sgMail from '@sendgrid/mail';
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';

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

  const emails = [{
    to: postData.email,
    bcc: 'yijie.lnl@gmail.com',
    from: 'yj.artjournal@gmail.com',
    templateId: paymentTemplate[postData.paymentOptions],
    dynamic_template_data: {
      customer_name: postData.fullName,
      checkoutItems: postData.selectedCheckoutItems,
      shippingFee: postData.shippingFee.toFixed(2),
      totalAmount: postData.totalAmount.toFixed(2),
      note: postData.note,
      discountMargin: postData.discountMargin,
      discount: postData.discount.toFixed(2),
      discountedAmount: postData.discountedAmount.toFixed(2),
    },
  }, {
    to: 'yijie.lnl@gmail.com',
    from: 'yj.artjournal@gmail.com',
    templateId: 'd-178070cfd5484d9298f0c21efde0c44b',
    dynamic_template_data: {
      order_code: `YJ${String(postData.currentOrderCount).padStart(4, '0')}`,
      customer_name: postData.fullName,
      phoneNo: postData.phoneNumber,
      address_line_1: postData.addressLine1,
      address_line_2: postData.addressLine2,
      postcode: postData.postcode,
      city: postData.city,
      state: postData.state,
      country: postData.country,
      checkoutItems: postData.selectedCheckoutItems,
      shippingFee: postData.shippingFee.toFixed(2),
      totalAmount: postData.totalAmount.toFixed(2),
      note: postData.note,
      discountMargin: postData.discountMargin,
      discount: postData.discount.toFixed(2),
      discountedAmount: postData.discountedAmount.toFixed(2),
    },
  }];

  try {
    await sgMail.send(emails);
    return res.status(200).json({ msg: 'Message sent successfully' });
  } catch (e:any) {
    return res.status(e.code).json({ msg: e.message });
  }
};

export default sendPaymentEmail;
