import { useState, useEffect } from "react";
import { wait } from "../services/time";

const DEFAULT_ERROR = "Internal Server Error";

interface IBaseConfig {
  defaultRes?: any;
  initReq?: boolean;
  showError?: boolean;
  onSuccess?: () => {};
  onError?: (error?: string) => {};
  sleep?: number;
}

export const usePromise = (promiseFunction: any, baseConfig?: IBaseConfig) => {
  const [hookState, setHookState] = useState({
    response: baseConfig?.defaultRes,
    loading: false,
    error: "",
  });

  const updateHookState = (newState = {}) => {
    setHookState({ ...hookState, ...newState });
  };

  const errorAlert = (error: any) => {
    if (baseConfig?.showError) alert(JSON.stringify({ err: error.message }));
  };

  function executePromise(...params: any[]) {
    updateHookState({ loading: true });
    const _params: any[] = [...params];
    try {
      const onSuccess =
        params?.find((param) => param?.onSuccess)?.onSuccess ||
        baseConfig?.onSuccess;

      return promiseFunction(...params)
        .then(async (value: any) => {
          await wait(baseConfig?.sleep);
          updateHookState({ response: value, loading: false });
          onSuccess?.(value);
          return value;
        })
        .catch((err: any) => {
          errorAlert(err);
          const errorMessage = err?.message || err || DEFAULT_ERROR;
          updateHookState({ error: errorMessage, loading: false });
          baseConfig?.onError?.(errorMessage);
        });
    } catch (error: any) {
      errorAlert(error);
      updateHookState({ error, loading: false });
      baseConfig?.onError?.(error.message);
    }
  }
  useEffect(() => {
    if (baseConfig?.initReq) executePromise();
  }, []);

  const { response, loading, error } = hookState;
  return [executePromise, response, loading, error];
};
