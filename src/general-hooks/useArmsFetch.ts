import { ArmDto, ArmRestControllerService } from '../generated';
import { apiWrapper } from '../utils/http-client';
import { handleError } from '../utils/utils';
import { useCallback, useEffect, useState } from 'react';

const useArmsFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [arms, setArms] = useState<ArmDto[]>([]);

  const fetchArms = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiWrapper(() => ArmRestControllerService.getAllArmsUsingGet());
      setArms(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  }, []);

  useEffect(() => {
    fetchArms();
  }, [fetchArms]);

  return {
    loadingArms: loading,
    fetchArms,
    arms,
  };
};

export default useArmsFetch;
