import {
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
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import { handleError } from "@safsims/utils/utils";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface IProps {
  termId: string;
}

const useGetClassReportGet = ({ termId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [classLevelSummary, setSummary] = useState<ClassInformationDto[]>();
  const [fetch, setFetch] = useState<number>(0);
  const refetch = () => setFetch(fetch + 1);

  const getClassInfo = async () => {
    setLoading(true);
    try {
      const data: ClassInformationDto[] = await apiWrapper(() =>
        ClassInformationRestControllerService.getClassInformationByParamsUsingGet(
          {
            termId,
          }
        )
      );

      setSummary(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  useEffect(() => {
    getClassInfo();
  }, [fetch, termId]);

  return {
    classLevelSummary,
    loadingClassLevelSummary: loading,
    refetchSummary: refetch,
  };
};

export default useGetClassReportGet;
