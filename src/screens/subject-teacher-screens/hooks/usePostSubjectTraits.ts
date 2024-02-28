import {
  ClassLevelSubjectTraitsResponse,
  SubjectTraitAssessmentRequest,
  SubjectTraitAssessmentRestControllerService,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import useLoading from "@safsims/utils/useLoading/useLoading";
import { handleError } from "@safsims/utils/utils";
import { useState } from "react";
import Toast from "react-native-toast-message";

interface IProps {
  termId?: string;
  studentId?: string;
}

const usePostSubjectTraits = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [subjectTraits, setTraits] = useState<
    ClassLevelSubjectTraitsResponse | undefined
  >(undefined);

  const postSubjectTratits = async ({
    termId,
    request,
  }: {
    termId: string;
    request: SubjectTraitAssessmentRequest;
  }) => {
    startLoading();
    try {
      const data = await apiWrapper(() =>
        SubjectTraitAssessmentRestControllerService.saveSubjectTraitAssessmentsUsingPost(
          { termId, request }
        )
      );
      setTraits(data);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Attendance updated successfully",
      });
      stopLoading();
    } catch (error) {
      handleError(error);
      stopLoading();
    }
  };

  return {
    loading,
    subjectTraits,
    postSubjectTratits,
  };
};

export default usePostSubjectTraits;
