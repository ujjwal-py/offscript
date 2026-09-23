import { useEffect, useState } from 'react'
import { api } from '../Api';
import type { ParamBody } from '../types';
import type { errorType } from '@/store/errorStore';
import { AxiosError } from 'axios';
import { toaster } from '@/components/ui/toaster';



function useFetch<T>(url: string, params?: ParamBody) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<errorType>();



  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get<T>(url, { params: params });
      setData(response.data);;

    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data)
        const Error: errorType = err.response?.data;
        toaster.create({
          title: Error.message,
          description: Error.errCode,
          type: "error"
        })
      } else {
        console.log(err);
        toaster.create({
          title: "something went wrong",
          description: "500",
          type: "error"
        })
      }
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
