import { Ref, ref } from "vue";

// interface UseAsyncReturnBase<Data, Params extends any[], Error> {
//   loading: Ref<boolean>;
//   state: Ref<Data | undefined>;
//   error?: Error;
//   execute: (...args: Params) => Promise<void>;
// }

// export function useAsync<Data, Params extends any[], Error>(
//   callback: () => Promise<(...args: Params) => Promise<Data>>
// ): UseAsyncReturnBase<Data, Params, Error> {
//   const loading = ref(false);
//   const state = ref<Data>();
//   console.log("useAsync");

//   const execute = async (...args: Params) => {
//     loading.value = true;
//     console.log(2);
//     const _promise = typeof callback === "function" ? callback() : callback;
//     const response = await callback();
//     state.value = response;
//     loading.value = false;
//   };

//   const shell: UseAsyncReturnBase<Data, Params, Error> = {
//     state,
//     execute,
//     loading,
//   };

//   return { ...shell };
// }

interface AsyncResult<T> {
  result: Ref<T | null>;
  error?: Ref<Error | null>;
  isLoading: Ref<boolean>;
  execute: (...params: any[]) => Promise<void>;
}

export function _useAsync<T>(
  callback: (...params: any[]) => Promise<T>
): AsyncResult<T> {
  const result: Ref<T | null> = ref(null);
  const error: Ref<Error | null> = ref(null);
  const isLoading: Ref<boolean> = ref(false);

  const execute = async (...params: any[]) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await callback(...params);
      result.value = response;
    } catch (err) {
      // error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    result,
    isLoading,
    execute,
    ...(error && { error }),
  };
}
