import useCurrentTermGet from "@safsims/general-hooks/useCurrentTermGet";
import {
  AttendanceDateRangeStatsResponse,
  AttendanceDto,
  AttendanceRestControllerService,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import { handleError } from "@safsims/utils/utils";
import moment from "moment";
import { useEffect, useState } from "react";

interface IProps {
  armId: string;
  classLevelId: string;
}

const useGetAttendanceStatistic = ({ classLevelId, armId }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetch, setFetch] = useState<number>(0);
  const [attendanceStat, setAttendanceStat] =
    useState<AttendanceDateRangeStatsResponse>({});
  const { currentTerm } = useCurrentTermGet();
  const refetch = () => setFetch(fetch + 1);
  const today = moment();
  const endDate = moment(today).format("YYYY/MM/DD");

  const currentYear = moment(today).year();
  const currentMonth = moment(today).month();
  const getAttendanceStats = async () => {
    setLoading(true);
    try {
      const data: AttendanceDateRangeStatsResponse = await apiWrapper(() =>
        AttendanceRestControllerService.getAttendanceDateRangeStatsUsingGet({
          armId,
          classLevelId,
          startDate: `${currentYear}-${
            currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1
          }-01`,
          endDate: endDate.replace(/\//g, "-"),
          termId: currentTerm?.term_id,
        })
      );
      setAttendanceStat(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  useEffect(() => {
    if (!currentTerm?.term_id || armId == "") {
      setLoading(true);
      return;
    }
    getAttendanceStats();
  }, [fetch, currentTerm?.term_id, armId]);

  return {
    attendanceStat,
    loadingAttendanceStat: loading,
    refetchAttendanceStat: refetch,
  };
};

export default useGetAttendanceStatistic;
