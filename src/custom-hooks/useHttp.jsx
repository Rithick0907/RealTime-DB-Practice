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
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest
  };
};

export default useHttp;
