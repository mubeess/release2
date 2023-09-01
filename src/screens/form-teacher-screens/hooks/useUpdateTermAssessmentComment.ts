import {
  StudentResultRestControllerService,
  TermCommentRequest,
  TermCommentRestControllerService,
  TermResultAndAssessmentDef,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import useLoading from "@safsims/utils/useLoading/useLoading";
import { handleError } from "@safsims/utils/utils";
import Toast from "react-native-toast-message";

const useUpdateTermAssessmentComment = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const updateChildComment = async ({
    request,
  }: {
    request: TermCommentRequest;
  }) => {
    startLoading();
    try {
      const data = await apiWrapper(() =>
        TermCommentRestControllerService.createOrUpdateTermCommentUsingPost({
          request,
        })
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Comment updated successfully",
      });
      stopLoading();
    } catch (error) {
      handleError(error);
      stopLoading();
    }
  };

  return {
    updatingComment: loading,
    updateChildComment,
  };
};

export default useUpdateTermAssessmentComment;
