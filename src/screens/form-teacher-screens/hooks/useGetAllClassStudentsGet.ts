import useCurrentTermGet from "@safsims/general-hooks/useCurrentTermGet";
import {
  ClassMemberDto,
  ClassMemberRestControllerService,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import { handleError } from "@safsims/utils/utils";
import { useEffect, useState } from "react";

interface IProps {
  armId: string;
  classLevelId: string;
  search?: string;
}

const useGetAllClassStudentsGet = ({
  search = "",
  classLevelId,
  armId,
}: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetch, setFetch] = useState<number>(0);
  const [students, setStudents] = useState<ClassMemberDto[]>([]);
  const { currentTerm } = useCurrentTermGet();
  const refetch = () => setFetch(fetch + 1);

  const getAllClassess = async () => {
    setLoading(true);
    try {
      const data: ClassMemberDto[] = await apiWrapper(() =>
        ClassMemberRestControllerService.getAllClassMembersUsingGet({
          termId: currentTerm?.term_id,
          armId,
          classLevelId,
          search,
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
    getAllClassess();
  }, [fetch, currentTerm?.term_id, search]);

  return {
    students,
    loadingStudents: loading,
    refetchStudents: refetch,
  };
};

export default useGetAllClassStudentsGet;
