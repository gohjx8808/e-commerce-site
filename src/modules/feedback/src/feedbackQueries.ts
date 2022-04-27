import { useMutation } from "react-query";
import { navigate } from "gatsby";
import { sendFeedbackEmail } from "./feedbackApi";
import { useAppDispatch } from "../../../hooks";
import {
  toggleSuccess,
  updateStatusMsg,
  toggleStatusModal,
} from "../../status/src/statusReducer";

// eslint-disable-next-line import/prefer-default-export
export const useSubmitFeedback = () => {
  const dispatch = useAppDispatch();
  return useMutation("submitFeedback", sendFeedbackEmail, {
    onSuccess: () => {
      dispatch(toggleSuccess(true));
      dispatch(
        updateStatusMsg(
          "Love to know that! Thank you for your precious feedback. Together we can make it better!"
        )
      );
      dispatch(toggleStatusModal(true));
      navigate("/");
    },
    onError: () => {
      dispatch(toggleSuccess(false));
      dispatch(updateStatusMsg("Somethings wrong happened! Please try again."));
      dispatch(toggleStatusModal(true));
    },
  });
};
