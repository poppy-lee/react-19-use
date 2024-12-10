import { Suspense, use, useState } from "react";

import { fetchTitle } from "./apis/fetchTitle";
import { useCachedPromise } from "./hooks/useCachedPromise";
import { fetchList } from "./apis/fetchList";

export const App = () => {
  const [page, setPage] = useState(0);

  const titlePromise = useCachedPromise(() => fetchTitle(page), [page]);
  const listPromise = useCachedPromise(() => fetchList(page), [page]);

  return (
    <>
      <Suspense fallback={<h1>loading title...</h1>}>
        <Title titlePromise={titlePromise} />
      </Suspense>
      <Suspense fallback={<span>loading list...</span>}>
        <List listPromise={listPromise} />
      </Suspense>
      <h2>page: {page}</h2>
      <button
        onClick={() => {
          setPage((page) => (10 + page - 1) % 10);
        }}
      >
        page - 1
      </button>
      <button
        onClick={() => {
          setPage((page) => (10 + page + 1) % 10);
        }}
      >
        page + 1
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
          item{item}
        </span>
      ))}
    </span>
  );
};
