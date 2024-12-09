import { Suspense, use, useState } from "react";
import { useCachedPromise } from "./hooks/useCachedPromise";

export const App = () => {
  const [counter, setCounter] = useState(0);

  const cachedTitlePromise = useCachedPromise(
    () => fetchTitle(counter),
    [counter]
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
