import { useCallback, useState } from "react";
import {
  QueryFunction,
  QueryObserverResult,
  useQuery,
  UseQueryOptions,
} from "react-query";

const useLazyQuery = (
  key: string,
  fn: QueryFunction<any, string>,
  options?: UseQueryOptions
): [() => void, QueryObserverResult<unknown, unknown>] => {
  const [enabled, setEnabled] = useState(false);
  const query = useQuery(key, fn, {
    ...options,
    enabled,
  });

  return [useCallback(() => setEnabled(true), []), query];
};

export default useLazyQuery;
