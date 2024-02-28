import {
  ClassLevelSubjectTraitsResponse,
  SubjectGroupDto,
  SubjectTraitAssessmentRestControllerService,
  SubjectTraitRestControllerService,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import useLoading from "@safsims/utils/useLoading/useLoading";
import { handleError } from "@safsims/utils/utils";
import { useEffect, useState } from "react";

interface IProps {
  termId?: string;
  studentId?: string;
}

const useGetAssignedSubjectTraitGroup = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [traitId, setTraits] = useState("");

  const getAssignedSubjectTratits = async ({ termId }) => {
    startLoading();
    try {
      const data = await apiWrapper(() =>
        SubjectTraitRestControllerService.fetchAssignedSubjectTraitGroupByTermUsingGet(
          {
            termId,
          }
        )
      );

      setTraits(data.id || "");
      stopLoading();
    } catch (error) {
      handleError(error);
      stopLoading();
    }
  };

  return {
    loading,
    traitId,
    getAssignedSubjectTratits,
  };
};

export default useGetAssignedSubjectTraitGroup;
