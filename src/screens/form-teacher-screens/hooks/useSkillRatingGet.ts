import useCurrentTermGet from "@safsims/general-hooks/useCurrentTermGet";
import {
  ClassMemberDto,
  ClassMemberRestControllerService,
  CognitiveSkillRestControllerService,
  SkillRatingResponse,
  SubjectDto,
  SubjectRestControllerService,
} from "@safsims/generated";
import { TimeTableDto } from "@safsims/generated/models/TimeTableDto";
import { TimeTableRestControllerService } from "@safsims/generated/services/TimeTableRestControllerService";
import { apiWrapper } from "@safsims/utils/http-client";
import { handleError } from "@safsims/utils/utils";
import { useEffect, useState } from "react";

interface IProps {
  armId: string;
  classLevelId: string;
  search?: string;
}

const useSkillRatingGet = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetch, setFetch] = useState<number>(0);
  const [skillRatings, setSkillRatings] = useState<SkillRatingResponse[]>([]);
  const { currentTerm } = useCurrentTermGet();
  const refetch = () => setFetch(fetch + 1);

  const getSkillRatings = async () => {
    setLoading(true);
    try {
      const data: SkillRatingResponse[] = await apiWrapper(() =>
        CognitiveSkillRestControllerService.getSkillRatingsUsingGet({
          termId: currentTerm?.term_id || "",
        })
      );
      setSkillRatings(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  useEffect(() => {
    if (!currentTerm?.term_id) {
      setLoading(true);
      return;
    }
    getSkillRatings();
  }, [fetch, currentTerm?.term_id]);

  return {
    skillRatings,
    loadingSkills: loading,
    refetchSkills: refetch,
  };
};

export default useSkillRatingGet;
