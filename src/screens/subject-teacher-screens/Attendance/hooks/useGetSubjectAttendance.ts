import useCurrentTermGet from "@safsims/general-hooks/useCurrentTermGet";
import {
  AttendanceDto,
  AttendanceRestControllerService,
  SubjectAttendanceDto,
  SubjectAttendanceRestControllerService,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import { handleError } from "@safsims/utils/utils";
import { useEffect, useState } from "react";

interface IProps {
  armId: string;
  classLevelId: string;
  dateRecorded?: string;
  subjectId: string;
}

const useGetSubjectAttendance = ({
  dateRecorded,
  classLevelId,
  armId,
  subjectId,
}: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetch, setFetch] = useState<number>(0);
  const [attendance, setStudents] = useState<SubjectAttendanceDto[]>([]);
  const { currentTerm } = useCurrentTermGet();
  const refetch = () => setFetch(fetch + 1);

  const getAllClassess = async () => {
    setLoading(true);
    try {
      const data: SubjectAttendanceDto[] = await apiWrapper(() =>
        SubjectAttendanceRestControllerService.getClassSubjectAttendanceUsingGet(
          {
            armId,
            classLevelId,
            termId: currentTerm?.term_id,
            subjectId,
            lessonDate: dateRecorded,
          }
        )
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
  }, [fetch, currentTerm?.term_id, dateRecorded, classLevelId]);

  return {
    attendance,
    loadingAttendance: loading,
    refetchAttendance: refetch,
  };
};

export default useGetSubjectAttendance;
