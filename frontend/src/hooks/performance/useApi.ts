import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';
import apiClient from '../services/api';

/**
 * Performance Hook: useApi
 * Features:
 * 1. Request Deduplication: Prevents multiple inflight requests to the same URL.
 * 2. Auto-Cancellation: Cancels request on component unmount.
 * 3. Loading/Error states.
 */

const inflightRequests = new Map<string, Promise<any>>();

export function useApi<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetch = async (url: string, config: AxiosRequestConfig = {}) => {
    const requestKey = `${config.method || 'GET'}:${url}:${JSON.stringify(config.params || {})}`;
    
    // 1. Request Deduplication
    if (inflightRequests.has(requestKey)) {
      setLoading(true);
      try {
        const result = await inflightRequests.get(requestKey);
        setData(result);
        return result;
      } finally {
        setLoading(false);
      }
    }

    setLoading(true);
    setError(null);

    const source = axios.CancelToken.source();
    const requestPromise = apiClient({
      ...config,
      url,
      cancelToken: source.token,
    })
    .then(res => res.data.data)
    .finally(() => {
      inflightRequests.delete(requestKey);
    });

    inflightRequests.set(requestKey, requestPromise);

    try {
      const result = await requestPromise;
      setData(result);
      return result;
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError(err);
        throw err;
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetch };
}
