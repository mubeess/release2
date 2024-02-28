import {
  ClassLevelSubjectTraitsResponse,
  SubjectTraitAssessmentRestControllerService,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import useLoading from "@safsims/utils/useLoading/useLoading";
import { handleError } from "@safsims/utils/utils";
import { useState } from "react";

interface IProps {
  termId?: string;
  studentId?: string;
}

const useGetSubjectTraits = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [subjectTraits, setTraits] = useState<
    ClassLevelSubjectTraitsResponse | undefined
  >(undefined);

  const getSubjectTratits = async ({ termId, classLevelId, subjectId }) => {
    startLoading();
    console.log(termId, classLevelId, subjectId);
    try {
      const data = await apiWrapper(() =>
        SubjectTraitAssessmentRestControllerService.getClassLevelSubjectTraitsUsingGet(
          {
            classLevelId,
            subjectId,
            termId,
          }
        )
      );

      setTraits(data);
      stopLoading();
    } catch (error) {
      
      handleError(error);
      stopLoading();
    }
  };

  return {
    loading,
    subjectTraits,
    getSubjectTratits,
  };
};

export default useGetSubjectTraits;
