import usePaginationWrapper from "@safsims/general-hooks/usePaginationWrapper";
import { ParentDto, ParentRestControllerService } from "@safsims/generated";
import { apiWrapper } from "@safsims/utils/http-client";
import { handleError } from "@safsims/utils/utils";
import { useEffect, useState } from "react";

interface IProps {
  id?: string;
}

const useAllParentGet = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [parent, setParent] = useState<ParentDto[]>([]);
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

  const fetchParent = async () => {
    setLoading(true);
    try {
      const data = await apiWrapper(() =>
        ParentRestControllerService.getAllParentUsingGet({
          search: debouncedSearchText,
          limit,
          offset,
        })
      );
      setParent(data.content || []);
      setPageable(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  useEffect(() => {
    fetchParent();
  }, [offset, searchText]);

  return {
    parent,
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

export default useAllParentGet;
