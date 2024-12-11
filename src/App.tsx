import {
  Dispatch,
  SetStateAction,
  Suspense,
  use,
  useDeferredValue,
  useState,
} from "react";
import { ErrorBoundary } from "react-error-boundary";

import { fetchList } from "./apis/fetchList";
import { fetchTitle } from "./apis/fetchTitle";
import { useCachedPromise } from "./hooks/useCachedPromise";

export const App = () => {
  const [page, setPage] = useState(0);
  const deferredPage = useDeferredValue(page);

  const titlePromise = useCachedPromise(
    () => fetchTitle(deferredPage),
    [deferredPage]
  );
  const listPromise = useCachedPromise(() => fetchList(page), [page]);

  return (
    <>
      <Suspense fallback={<h1>loading title...</h1>}>
        <Title titlePromise={titlePromise} />
      </Suspense>
      <ErrorBoundary
        resetKeys={[page]}
        fallbackRender={({ error }) => <span>Error: {error}</span>}
      >
        <Suspense fallback={<span>loading list...</span>}>
          <List listPromise={listPromise} />
        </Suspense>
      </ErrorBoundary>
      <Pagination page={page} setPage={setPage} />
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

const Pagination = ({
  page,
  setPage,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <h2>page: {page}</h2>
      <button onClick={() => setPage((page) => (10 + page - 1) % 10)}>
        page - 1
      </button>
      <button onClick={() => setPage((page) => (10 + page + 1) % 10)}>
        page + 1
      </button>
    </>
  );
};
