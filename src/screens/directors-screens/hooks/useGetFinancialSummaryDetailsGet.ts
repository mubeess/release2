import {
  CheckoutRestControllerService,
  RevenueStatisticsRestControllerService,
  RevenueSummaryDto,
  SchoolFeesCheckoutResponse,
  SchoolFeesPaymentsRestControllerService,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import { handleError } from "@safsims/utils/utils";
import { useEffect, useState } from "react";

interface IProps {
  termId: string;
}

const useGetFinancialSummaryDetailsGet = ({ termId }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [summary, setCheckout] = useState<RevenueSummaryDto>();
  const [fetch, setFetch] = useState<number>(0);
  const refetch = () => setFetch(fetch + 1);

  const getSchoolStatistics = async (termId) => {
    setLoading(true);
    try {
      const data: RevenueSummaryDto = await apiWrapper(() =>
     
        RevenueStatisticsRestControllerService.getRevenueSummaryUsingGet({
          termId,
        })
      );

      setCheckout(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  useEffect(() => {
    if (termId) {
      getSchoolStatistics(termId);
    }
  }, [termId, fetch]);

  return {
    summary,
    loadingSummary: loading,
    refetchSummary: refetch,
  };
};

export default useGetFinancialSummaryDetailsGet;
