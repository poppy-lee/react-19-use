import { Suspense, use, useState } from "react";

import { fetchTitle } from "./apis/fetchTitle";
import { useCachedPromise } from "./hooks/useCachedPromise";

export const App = () => {
  const [counter, setCounter] = useState(0);
  const titlePromise = useCachedPromise(() => fetchTitle(counter), [counter]);

  return (
    <>
      <Suspense fallback={<h1>loading...</h1>}>
        <Title titlePromise={titlePromise} />
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
