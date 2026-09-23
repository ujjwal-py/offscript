import { useEffect, useState } from 'react'
import { api } from '../Api';
import type { ParamBody } from '../types';

function useFetch<T>(url: string, params?: ParamBody) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();



  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get<T>(url, { params: params });
      setData(response.data);;

    } catch (err) {
      setError(err);
      // setErrorStore(err as errorType)
      // console.log("from error state", error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url, params?.page, params?.limit, params?.order, params?.sort_by, params?.q]);

  return ({ data, loading, error, refetch: fetchData })
}

export default useFetch
