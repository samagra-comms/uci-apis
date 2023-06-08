function withDefaults<T>() {
  return function <TDefaults extends Partial<T>>(defs: TDefaults) {
    return function (
      p: Pick<T, Exclude<keyof T, keyof TDefaults>> & Partial<TDefaults>,
    ): T {
      const result: any = p;
      for (const k of Object.keys(defs)) {
        result[k] = result[k] || defs[k];
      }
      return result;
    };
  };
}

export type FormUploadStatus = {
  status: 'PENDING' | 'UPLOADED' | 'ERROR';
  error?: string;
  errorCode?: string;
  errorMessage?: string;
  data?: any;
};

export type FormMediaUploadStatus = {
  status: 'PENDING' | 'UPLOADED' | 'ERROR';
  error?: string;
  errorCode?: number;
  data?: any;
}
