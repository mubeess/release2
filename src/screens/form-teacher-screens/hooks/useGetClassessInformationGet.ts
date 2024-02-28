import useCurrentTermGet from "@safsims/general-hooks/useCurrentTermGet";
import {
  ClassInformationDto,
  ClassInformationRestControllerService,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import { handleError } from "@safsims/utils/utils";
import { useEffect, useState } from "react";

interface IProps {
  termId: string;
}

const useGetClassessInformationGet = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetch, setFetch] = useState<number>(0);
  const [classess, setClasses] = useState<ClassInformationDto[]>([]);
  const { currentTerm } = useCurrentTermGet();
  const refetch = () => setFetch(fetch + 1);

  const getAllClassess = async () => {
    setLoading(true);
    try {
      const data: ClassInformationDto[] = await apiWrapper(() =>
        ClassInformationRestControllerService.getClassInformationByParamsUsingGet(
          { termId: currentTerm?.term_id }
        )
      );
      console.log(data, "data");
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
    getAllClassess();
  }, [fetch, currentTerm?.term_id]);

  return {
    classess,
    loadingClassess: loading,
    refetchClassess: refetch,
  };
};

export default useGetClassessInformationGet;
