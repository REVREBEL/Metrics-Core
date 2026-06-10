import { useEffect, useState } from "react";

// prevents nextjs hydration error if using nextjs
export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Client-only mounted state / hydration guard
    setData(result);
  }, [result]);

  return data;
};
