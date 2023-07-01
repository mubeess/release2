import { useEffect, useState } from 'react';
import { StaffDto, StaffRestControllerService } from '../generated';
import { apiWrapper } from '../utils/http-client';
import { handleError } from '../utils/utils';
import useLoading from '../utils/useLoading/useLoading';

const useAcademicStaffsGet = () => {
  const { startLoading, stopLoading, loading } = useLoading();
  const [staffs, setStaffs] = useState<StaffDto[]>([]);

  const fetchStaffs = async () => {
    startLoading();
    try {
      const data = await apiWrapper(() =>
        StaffRestControllerService.fetchAllAcademicStaffUsingGet(),
      );
      setStaffs(data);
      stopLoading();
    } catch (error) {
      stopLoading();
      handleError(error);
    }
  };

  useEffect(() => {
    fetchStaffs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    staffs,
    loading,
  };
};

export default useAcademicStaffsGet;
