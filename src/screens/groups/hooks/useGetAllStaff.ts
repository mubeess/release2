import usePaginationWrapper from "@safsims/general-hooks/usePaginationWrapper";
import {
  StaffDto,
  ParentRestControllerService,
  StaffRestControllerService,
} from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import { handleError } from "@safsims/utils/utils";
import { useEffect, useState } from "react";

interface IProps {
  id?: string;
}

const useGetAllStaff = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [staff, setStaff] = useState<StaffDto[]>([]);
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

    page,
    setPage,
    setOffset,
    lastPage,
    setLimit,
  } = usePaginationWrapper();

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const data = await apiWrapper(() =>
        StaffRestControllerService.getAllStaffUsingGet({
          search: debouncedSearchText,
          limit,
          offset,
        })
      );
      setStaff(data.content || []);
      setPageable(data.content);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [offset, searchText]);

  return {
    staff,
    loadingParent: loading,
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
  };
};

export default useGetAllStaff;
