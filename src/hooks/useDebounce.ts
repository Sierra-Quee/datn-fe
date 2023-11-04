import { useEffect, useState } from "react";

const useDebounce = (value: string) => {
    const [debounceValue, setDebounceValue] = useState<string>();

    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value), 300);
        return () => clearTimeout(handler);
    }, [value]);

    return debounceValue;
};

export default useDebounce;
