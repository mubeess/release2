import {
  CheckoutRestControllerService,
  RevenueStatisticsRestControllerService,
  RevenueSummaryDto,
  SchoolFeesCheckoutResponse,
  SchoolFeesPaymentsRestControllerService,
  StaffDashboardStats,
  StaffRestControllerService,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import { handleError } from "@safsims/utils/utils";
import { useEffect, useState } from "react";

interface IProps {
  termId: string;
}

const useGetStaffReportGet = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setSummary] = useState<StaffDashboardStats>();
  const [fetch, setFetch] = useState<number>(0);
  const refetch = () => setFetch(fetch + 1);

  const getStaffStat = async () => {
    setLoading(true);
    try {
      const data: StaffDashboardStats = await apiWrapper(() =>
        StaffRestControllerService.getStaffStatisticsUsingGet()
      );

      setSummary(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  useEffect(() => {
    getStaffStat();
  }, [fetch]);

  return {
    summary,
    loadingStaffSummary: loading,
    refetchSummary: refetch,
  };
};

export default useGetStaffReportGet;
