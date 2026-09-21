import { useEffect } from 'react'
import { useOptionStore } from '@/store/postStore'

function useDebounce(query: string) {
    const setQuery = useOptionStore((state) => state.setQ);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setQuery(query)
        }, 300)
        return () => clearTimeout(timeout);
    }, [query])
    return (
        query
    )
}

export default useDebounce