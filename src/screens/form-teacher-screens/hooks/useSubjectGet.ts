import useCurrentTermGet from "@safsims/general-hooks/useCurrentTermGet";
import {
  ClassMemberDto,
  ClassMemberRestControllerService,
  SubjectDto,
  SubjectRestControllerService,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import { handleError } from "@safsims/utils/utils";
import { useEffect, useState } from "react";

interface IProps {
  armId: string;
  classLevelId: string;
  search?: string;
}

const useSubjectGet = ({ search = "", classLevelId, armId }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetch, setFetch] = useState<number>(0);
  const [subjects, setStudents] = useState<SubjectDto[]>([]);
  const { currentTerm } = useCurrentTermGet();
  const refetch = () => setFetch(fetch + 1);

  const getClassSubjects = async () => {
    setLoading(true);
    try {
      const data: SubjectDto[] = await apiWrapper(() =>
        SubjectRestControllerService.getClassSubjectsUsingGet({
          classLevelId,
          armId,
          termId: currentTerm?.term_id,
        })
      );
      setStudents(data);
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
    getClassSubjects();
  }, [fetch, currentTerm?.term_id, search]);

  return {
    subjects,
    loadingSubjects: loading,
    refetchSubjects: refetch,
  };
};

export default useSubjectGet;
