import {
  CognitiveSkillAssessmentRestControllerService,
  GroupedStudentSkillAssessmentResponse,
  StudentSkillAssessmentDto,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import useLoading from "@safsims/utils/useLoading/useLoading";
import { handleError } from "@safsims/utils/utils";
import { useState } from "react";

interface IProps {
  termId?: string;
  studentId?: string;
}

const useChildSkillsGet = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [skills, setSkills] = useState<StudentSkillAssessmentDto[] | []>([]);

  const getSkills = async ({ termId, studentId }) => {
    startLoading();
    try {
      const data: StudentSkillAssessmentDto[] = await apiWrapper(() =>
        CognitiveSkillAssessmentRestControllerService.getStudentSkillAssessmentsUsingGet(
          {
            studentId,
            termId,
          }
        )
      );
      setSkills(data);
      stopLoading();
    } catch (error) {
      handleError(error);
      stopLoading();
    }
  };

  return {
    loadingSkills: loading,
    skills,
    getSkills,
  };
};

export default useChildSkillsGet;
