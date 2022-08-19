import { useEffect, useState } from "react";

function useDebounce(search: string, runFunc: () => void) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      setInit((prev) => !prev);
      return () => null;
    }
    const handler = setTimeout(() => {
      runFunc();
    }, 1300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);
}

export default useDebounce;
