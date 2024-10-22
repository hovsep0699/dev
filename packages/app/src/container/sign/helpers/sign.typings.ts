export type DefaultState = {
  start: boolean;
  hasAutosigning?: null | boolean;
  signListLoading: boolean;
  signListFailure: any;
  signList: any[];
  signTotal: number;
  signCurrent: number;
  /** флаг наличия роли ROLE_INCOMPLETE */
  hasRoleIncomplete?: boolean;
};

export type ActionInit = {};
