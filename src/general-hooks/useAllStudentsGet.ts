import { useEffect, useState } from "react";
import usePaginationWrapper from "./usePaginationWrapper";
import { StudentDto, StudentRestControllerService } from "../generated";
import useLoading from "../utils/useLoading/useLoading";
import { apiWrapper } from "../utils/http-client";
import { handleError } from "../utils/utils";

const useAllStudentsGet = () => {
  const [students, setStudents] = useState<StudentDto[]>([]);
  const { loading, startLoading, stopLoading } = useLoading();

  const {
    limit,
    offset,
    setOffset,
    setLimit,
    lastPage,
    firstPage,
    totalElements,
    totalPages,
    numberOfElements,
    setPageable,
    page,
    setPage,
    pageOptions,
    debouncedSearchText,
    searchText,
    setSearchText,
    infiniteScrollCallback,
  } = usePaginationWrapper();

  const fetchStudents = async () => {
    startLoading();
    try {
      const data = await apiWrapper(() =>
        StudentRestControllerService.getAllStudentsUsingGet1({
          limit,
          offset,
          search: searchText,
        })
      );
      setStudents(data?.content || []);
      setPageable(data);
      stopLoading();
    } catch (error) {
      stopLoading();
      handleError(error);
    }
  };

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, limit, debouncedSearchText]);

  return {
    students,
    loadingStudents: loading,
    limit,
    offset,
    setOffset,
    setLimit,
    lastPage,
    firstPage,
    totalElements,
    totalPages,
    numberOfElements,
    setPageable,
    page,
    setPage,
    pageOptions,
    setSearchText,
    searchText,
    infiniteScrollCallback,
  };
};

export default useAllStudentsGet;
