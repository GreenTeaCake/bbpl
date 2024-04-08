export type AsyncSliceState<T extends object> = {
  value: T[];
  isLoading: boolean;
  error: string | null;
};
