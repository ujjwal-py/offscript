import { useEffect, useState } from 'react'
import { api } from '../Api';



function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get<T>(url);
      setData(response.data);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return ({ data, loading, error, refetch: fetchData })
}

export default useFetch