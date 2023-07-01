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
    SchoolTermDefinitionRestControllerService,
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
  
  const useGetSchoolConfigurations = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [arms, setArms] = useState<ArmDto[]>();
    const [fetch, setFetch] = useState<number>(0);
    const refetch = () => setFetch(fetch + 1);
  
    const getArmsInfo = async () => {
      setLoading(true);
      try {
        const data: ArmDto[] = await apiWrapper(() =>
          SchoolTermDefinitionRestControllerService.getAllDefinitionsUsingGet()
        );
  
        setArms(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleError(error);
      }
    };
  
    useEffect(() => {
      getArmsInfo();
    }, [fetch]);
  
    return {
      arms,
      loadingArms: loading,
      refetchSummary: refetch,
    };
  };
  
  export default useGetSchoolConfigurations;
  