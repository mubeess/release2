import useCurrentTermGet from "@safsims/general-hooks/useCurrentTermGet";
import {
  ClassInformationDto,
  ClassInformationRestControllerService,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import { handleError } from "@safsims/utils/utils";
import { useEffect, useState } from "react";

interface IProps {
  classLevelId: string;
  armId: string;
}

const useGetIndividualClassessInformation = ({
  classLevelId,
  armId,
}: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetch, setFetch] = useState<number>(0);
  const [classess, setClasses] = useState<ClassInformationDto[]>([]);
  const { currentTerm } = useCurrentTermGet();
  const refetch = () => setFetch(fetch + 1);

  const getClassInformation = async () => {
    setLoading(true);
    try {
      const data: ClassInformationDto[] = await apiWrapper(() =>
        ClassInformationRestControllerService.getClassInformationByParamsUsingGet(
          { termId: currentTerm?.term_id, classLevelId, armId }
        )
      );
      setClasses(data);
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
    getClassInformation();
  }, [fetch, currentTerm?.term_id]);

  return {
    classess,
    loadingClass: loading,
    refetchClassess: refetch,
  };
};

export default useGetIndividualClassessInformation;
