import usePaginationWrapper from "@safsims/general-hooks/usePaginationWrapper";
import {
  ClassLevelDto,
  ClassLevelRestControllerService,
  Page_StaffDto_,
  Staff,
  StaffDto,
  StaffRestControllerService,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import useLoading from "@safsims/utils/useLoading/useLoading";
import { handleError } from "@safsims/utils/utils";
import { useEffect, useState } from "react";

interface IProps {
  termId: string;
}

const useGetAllClassLevelGet = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [conten, setContet] = useState([]);
  const [fetch, setFetch] = useState<number>(0);
  const refetch = () => setFetch(fetch + 1);
  const {
    limit,
    offset,
    setPageable,
    infiniteScrollCallback,
    debouncedSearchText,
    searchText,
    setSearchText,
    content,
    page,
    setPage,
    setOffset,
    lastPage,
  } = usePaginationWrapper();

  const getPageClassLevel = async () => {
    startLoading();
    try {
      const data: ClassLevelDto[] = await apiWrapper(() =>
        ClassLevelRestControllerService.getAllClassLevelsUsingGet()
      );

      setPageable(data);
      stopLoading();
    } catch (error) {
      stopLoading();
      handleError(error);
    }
  };

  useEffect(() => {
    getPageClassLevel();
  }, [offset, limit, page]);

  return {
    classLevels: content as ClassLevelDto[],
    loadingClassLevels: loading,
    refetchSummary: refetch,
    searchText,
    setSearchText,
    infiniteScrollCallback,
    page,
    setPage,
    lastPage,
  };
};

export default useGetAllClassLevelGet;
