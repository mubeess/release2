
import { useCallback, useEffect, useState } from 'react';
import { apiWrapper } from '../utils/http-client';
import { TermDto, TermRestControllerService } from '../generated';
import { handleError } from '../utils/utils';

const useAllExisitingTermsFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [terms, setExistingTerms] = useState<TermDto[]>([]);

  const fetchTerms = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiWrapper(() => TermRestControllerService.getAllTermsUsingGet());
      setExistingTerms(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  }, []);

  useEffect(() => {
    fetchTerms();
  }, [fetchTerms]);

  return {
    loadingTerms: loading,
    fetchTerms,
    terms,
  };
};

export default useAllExisitingTermsFetch;
