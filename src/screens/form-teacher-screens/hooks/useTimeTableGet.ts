import useCurrentTermGet from "@safsims/general-hooks/useCurrentTermGet";
import {
  ClassMemberDto,
  ClassMemberRestControllerService,
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

const useTimeTableGet = ({ search = "", classLevelId, armId }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetch, setFetch] = useState<number>(0);
  const [timeTable, setTimeTable] = useState<TimeTableDto>({});
  const { currentTerm } = useCurrentTermGet();
  const refetch = () => setFetch(fetch + 1);

  const getTimeTable = async () => {
    setLoading(true);
    try {
      const data: TimeTableDto = await apiWrapper(() =>
        TimeTableRestControllerService.getTimeTableForFormTeacherUsingGet({
          armId,
          classLevelId,
          termId: currentTerm?.term_id || "",
        })
      );
      setTimeTable(data);
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
    getTimeTable();
  }, [fetch, currentTerm?.term_id, search]);

  return {
    timeTable,
    loadingTimeTable: loading,
    refetchTimeTable: refetch,
  };
};

export default useTimeTableGet;
