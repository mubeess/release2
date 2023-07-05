import { TermDto, TermRestControllerService } from "../generated";
import { apiWrapper } from "../utils/http-client";
import { handleError } from "../utils/utils";
import { useCallback, useEffect, useState } from "react";

const useAllTermsGet = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [terms, setTerms] = useState<TermDto[]>([]);

  const fetchTerms = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiWrapper(() =>
        TermRestControllerService.getAllTermsUsingGet()
      );
      setTerms(data);
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
    loading,
    fetchTerms,
    terms,
  };
};

export default useAllTermsGet;
