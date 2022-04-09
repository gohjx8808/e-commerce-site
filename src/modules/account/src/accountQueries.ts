import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch } from "../../../hooks";
import { getCurrentUserDetailsKey } from "../../auth/src/authQueries";
import { toggleLoadingOverlay } from "../../overlay/src/overlayReducer";
import {
  toggleStatusModal,
  toggleSuccess,
  updateStatusMsg,
  updateStatusTitle,
} from "../../status/src/statusReducer";
import { submitEditAccDetail } from "./accountApi";
import { toggleEditAccDetailModal } from "./accountReducer";

// eslint-disable-next-line import/prefer-default-export
export const useEditAccDetails = (toggleModal?: () => void) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation("submitEditAccDetails", submitEditAccDetail, {
    onSuccess: () => {
      queryClient.invalidateQueries(getCurrentUserDetailsKey);
      if (toggleModal) {
        toggleModal();
      }
      dispatch(updateStatusTitle("Edit Account Details"));
      dispatch(toggleSuccess(true));
      dispatch(updateStatusMsg("Your profile has been successfully updated!"));
      dispatch(toggleLoadingOverlay(false));
      dispatch(toggleEditAccDetailModal(false));
      dispatch(toggleStatusModal(true));
    },
    onError: () => {
      dispatch(updateStatusTitle("Edit Account Details"));
      dispatch(toggleSuccess(false));
      dispatch(updateStatusMsg("Your profile has failed to be update!"));
      dispatch(toggleLoadingOverlay(false));
      dispatch(toggleStatusModal(true));
    },
  });
};
