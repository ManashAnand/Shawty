"use client";

import { useState } from "react";

type FetchCallback<T> = (option: any, ...args: any[]) => Promise<T>;

interface UseFetchOptions {
  [key: string]: any;
}

interface UseFetchResult<T> {
  data: T | null;
  fn: (...args: any[]) => Promise<void>;
  loading: boolean;
  error: any;
}

const useFetch = <T,>(
  cb: FetchCallback<T>,
  option: UseFetchOptions = {}
): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fn = async (...args: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const res = await cb(option, ...args);
      setData(res);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
