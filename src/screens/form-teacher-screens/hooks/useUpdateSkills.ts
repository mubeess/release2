import {
  AttendanceRequest,
  AttendanceRestControllerService,
  CognitiveSkillAssessmentRestControllerService,
  UpdateStudentSkillAssessmentRequest,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import useLoading from "@safsims/utils/useLoading/useLoading";
import { handleError } from "@safsims/utils/utils";
import Toast from "react-native-toast-message";

const useUpdateSkills = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const updateSkills = async ({
    request,
  }: {
    request: UpdateStudentSkillAssessmentRequest;
  }) => {
    startLoading();
    try {
      const data = await apiWrapper(() =>
        CognitiveSkillAssessmentRestControllerService.updateStudentSkillAssessmentsUsingPut(
          {
            request,
          }
        )
      );
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Skills updated successfully",
      });
      stopLoading();
    } catch (error) {
      handleError(error);
      stopLoading();
    }
  };

  return {
    updatingSkills: loading,
    updateSkills,
  };
};

export default useUpdateSkills;
