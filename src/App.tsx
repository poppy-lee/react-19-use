import { Suspense, use, useRef, useState } from "react";

export const App = () => {
  const [counter, setCounter] = useState(0);
  const cachedTitlePromise = useCachedPromise(
    () => fetchTitle(counter),
    counter
  );

  return (
    <>
      <Suspense fallback={<h1>loading...</h1>}>
        <Title titlePromise={cachedTitlePromise} />
      </Suspense>
      <h2>counter: {counter}</h2>
      <button
        onClick={() => {
          setCounter((counter) => (counter + 1) % 10);
        }}
      >
        counter + 1
      </button>
    </>
  );
};

const Title = ({ titlePromise }: { titlePromise: Promise<string> }) => {
  const title = use(titlePromise);
  return <h1>{title}</h1>;
};

const useCachedPromise = <T extends any>(
  createPromise: () => Promise<T>,
  key?: any
): Promise<T> => {
  const sid = JSON.stringify(key);
  const cachedPromisesRef = useRef<{ [sid: string]: Promise<T> }>({});
  if (
    cachedPromisesRef.current[sid] === null ||
    cachedPromisesRef.current[sid] === undefined
  ) {
    cachedPromisesRef.current[sid] = createPromise();
  }
  return cachedPromisesRef.current[sid];
};

function fetchTitle(counter: number = 0) {
  const randomDelay = counter % 2 ? 100 : 1000;
  const timestamp = new Date().toLocaleString();

  console.log(
    `run fetchTitle(counter: ${counter}), ${randomDelay}, ${timestamp}`
  );

  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Hello, use() hook!: ${counter} ${timestamp}`);
    }, randomDelay);
  });
}
