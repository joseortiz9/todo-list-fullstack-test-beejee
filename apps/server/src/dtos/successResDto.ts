export type SuccessResDto<T extends object> = {
  ok: boolean;
  data: T;
};
