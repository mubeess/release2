import {
  BasicSchoolInformationResponse,
  BasicSchoolInformationRestControllerService,
} from '@safsims/generated';
import { updateAppConfigState } from '@safsims/redux/configuration/actions';
import { school_id } from '@safsims/utils/constants';
import { apiWrapper } from '@safsims/utils/http-client';
import { setSiteTheme } from '@safsims/utils/Theme';
import { handleError } from '@safsims/utils/utils';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useSchoolInfoGet = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [schoolInfo, setSchoolInfo] = useState<BasicSchoolInformationResponse | undefined>(
    undefined,
  );

  const fetchSchoolInfo = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiWrapper(() =>
        BasicSchoolInformationRestControllerService.getSchoolInformationUsingGet({
          schoolId: school_id,
        }),
      );
      dispatch(
        updateAppConfigState({
          schoolInfo: data,
        }),
      );
      setSchoolInfo(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  }, []);

  useEffect(() => {
    fetchSchoolInfo();
  }, [fetchSchoolInfo]);

  useEffect(() => {
    if (schoolInfo?.basic_school_information?.color) {
      setSiteTheme(schoolInfo.basic_school_information.color);
    }
  }, [schoolInfo]);

  return {
    loadingSchoolInfo: loading,
    fetchSchoolInfo,
    schoolInfo,
    schoolName: schoolInfo?.basic_school_information?.school_name,
    shortName: schoolInfo?.basic_school_information?.short_name,
    schoolLogo: schoolInfo?.basic_school_information?.logo,
    motto: schoolInfo?.basic_school_information?.motto,
  };
};

export default useSchoolInfoGet;
