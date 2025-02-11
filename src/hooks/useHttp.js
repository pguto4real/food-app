import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, Failed to perform request"
    );
  }

  return resData;
}

export function useHttp(url, config, initialValue, fntn) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);
  function clearData() {
    setFetchedData(initialValue);
  }
  const sendRequest = useCallback(
    async function sendRequest(data) {
      // console.log(fntn)
      setIsFetching(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setFetchedData(resData);
      } catch (error) {
        setError(error.message || "Failed to fetch user places.");
      }
      setIsFetching(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);
  // console.log(error)
  return {
    isFetching,
    fetchedData,
    error,
    setFetchedData,
    sendRequest,
    clearData,
  };
}
