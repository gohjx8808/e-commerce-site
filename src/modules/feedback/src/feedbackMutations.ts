import { StatusModalContext } from "@contextProvider/StatusModalContextProvider";
import { navigate } from "gatsby";
import { useContext } from "react";
import { useMutation } from "react-query";
import { submitFeedback } from "./feedbackApi";

// eslint-disable-next-line import/prefer-default-export
export const useSubmitFeedback = () => {
  const { toggleSuccess, toggleVisible, updateMsg, updateTitle } =
    useContext(StatusModalContext);
  return useMutation("submitFeedback", submitFeedback, {
    onSuccess: () => {
      toggleSuccess(true);
      updateMsg(
        "Love to know that! Thank you for your precious feedback. Together we can make it better!"
      );
      toggleVisible(true);
      navigate("/");
    },
    onError: () => {
      toggleSuccess(false);
      updateMsg("Somethings wrong happened! Please try again.");
      toggleVisible(true);
    },
    onSettled: () => updateTitle("Feedback"),
  });
};
