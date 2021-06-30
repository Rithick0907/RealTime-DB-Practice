import { useCallback, useState } from "react";
import { http } from "../services/httpService";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    const { method, url, ...otherConfig } = requestConfig;
    setIsLoading(() => true);
    setError(() => null);

    try {
      const { data } = await http({
        method,
        url,
        ...otherConfig
      });
      if (applyData) applyData(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest
  };
};

export default useHttp;
