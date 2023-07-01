import usePaginationWrapper from "@safsims/general-hooks/usePaginationWrapper";
import {
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

const useGetAllStaffGet = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [fetch, setFetch] = useState<number>(0);
  const [staffs, setStaffs] = useState<StaffDto[]>([]);
  const refetch = () => setFetch(fetch + 1);
  const {
    limit,
    offset,
    setPageable,
    infiniteScrollCallback,
    debouncedSearchText,
    searchText,
    setSearchText,

    page,
    setPage,
    setOffset,
    lastPage,
    setLimit,
  } = usePaginationWrapper();

  const getPageStaff = async () => {
    startLoading();
    try {
      const data: Page_StaffDto_ = await apiWrapper(() =>
        StaffRestControllerService.getAllStaffUsingGet({
          search: debouncedSearchText,
          limit,
          offset,
        })
      );
      setStaffs(data.content || []);

      setPageable(data);
      stopLoading();
    } catch (error) {
      stopLoading();
      handleError(error);
    }
  };

  useEffect(() => {
    getPageStaff();
  }, [offset, searchText]);

  return {
    loadingPageStaff: loading,
    refetchSummary: refetch,
    searchText,
    setSearchText,
    infiniteScrollCallback,
    page,
    setPage,
    lastPage,
    setOffset,
    setLimit,
    offset,
    pageStaff: staffs,
  };
};

export default useGetAllStaffGet;
