import { useRef } from "react";

export const useCachedPromise = <T extends any>(
  createPromise: () => Promise<T>,
  dependencies: any[] = []
): Promise<T> => {
  const key = JSON.stringify(dependencies);
  const promisesRef = useRef<{ [key: string]: Promise<T> }>({});

  if (
    promisesRef.current[key] === null ||
    promisesRef.current[key] === undefined
  ) {
    promisesRef.current[key] = createPromise();
  }

  return promisesRef.current[key];
};
