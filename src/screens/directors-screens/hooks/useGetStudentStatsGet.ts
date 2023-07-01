import {
  ArmDto,
  ArmRestControllerService,
  CheckoutRestControllerService,
  ClassAndSubjects,
  ClassInfoParam,
  ClassInformationDto,
  ClassInformationRequest,
  ClassInformationRestControllerService,
  ClassInformation_,
  ClassLevelDto,
  ClassLevelRestControllerService,
  RevenueStatisticsRestControllerService,
  RevenueSummaryDto,
  SchoolFeesCheckoutResponse,
  SchoolFeesPaymentsRestControllerService,
  StaffDashboardStats,
  StaffRestControllerService,
  StudentDashboardStats,
  StudentRestControllerService,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import { handleError } from "@safsims/utils/utils";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface IProps {
  termId: string;
}

const useGetStudentStatsGet = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [studenStat, setStudentStats] = useState<StudentDashboardStats>();
  const [fetch, setFetch] = useState<number>(0);
  const refetch = () => setFetch(fetch + 1);

  const getStudentsInfo = async () => {
    setLoading(true);
    try {
      const data: StudentDashboardStats = await apiWrapper(() =>
        StudentRestControllerService.getStudentsStatisticsUsingGet()
      );

      setStudentStats(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  useEffect(() => {
    getStudentsInfo();
  }, [fetch]);

  return {
    studenStat,
    loadingStudents: loading,
    refetchSummary: refetch,
  };
};

export default useGetStudentStatsGet;
