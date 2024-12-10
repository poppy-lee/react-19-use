import { Suspense, use, useState } from "react";

import { fetchTitle } from "./apis/fetchTitle";
import { useCachedPromise } from "./hooks/useCachedPromise";
import { fetchList } from "./apis/fetchList";

export const App = () => {
  const [counter, setCounter] = useState(0);

  const titlePromise = useCachedPromise(() => fetchTitle(counter), [counter]);
  const listPromise = useCachedPromise(() => fetchList(counter), [counter]);

  return (
    <>
      <Suspense fallback={<h1>loading...</h1>}>
        <Title titlePromise={titlePromise} />
      </Suspense>
      <Suspense fallback={<span>loading...</span>}>
        <List listPromise={listPromise} />
      </Suspense>
      <h2>counter: {counter}</h2>
      <button
        onClick={() => {
          setCounter((counter) => (10 + counter + 1) % 10);
        }}
      >
        counter + 1
      </button>
      <button
        onClick={() => {
          setCounter((counter) => (10 + counter - 1) % 10);
        }}
      >
        counter - 1
      </button>
    </>
  );
};

const Title = ({ titlePromise }: { titlePromise: Promise<string> }) => {
  const title = use(titlePromise);
  return <h1>{title}</h1>;
};

const List = ({ listPromise }: { listPromise: Promise<number[]> }) => {
  const list = use(listPromise);
  return (
    <span>
      {list.map((item) => (
        <span key={item} style={{ margin: "0 4px" }}>
          {item}
        </span>
      ))}
    </span>
  );
};
