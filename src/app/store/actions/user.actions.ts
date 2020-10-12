import {Action} from '@ngrx/store';
import {UserInterface} from '../../Interfaces/UserInterface';

export enum UsersActionsTypes {
  USERS_LIST_REQUEST = '[user_lists] list request',
  USERS_LIST_ERROR = '[user_lists] list error',
  USERS_LIST_SUCCESS = '[user_lists] list success',

  USERS_ITEM_REQUEST = '[user_lists] item request',
  USERS_ITEM_ERROR = '[user_lists] item error',
  USERS_ITEM_SUCCESS = '[user_lists] item success',

  LOGIN_REQUEST = '[user_lists] login request',
  LOGIN_ERROR = '[user_lists] login error',
  LOGIN_SUCCESS = '[user_lists] login success',

  USERS_UPDATE_REQUEST = '[user_lists] update request',
  USERS_UPDATE_ERROR = '[user_lists] update error',
  USERS_UPDATE_SUCCESS = '[user_lists] update success',

  LOGOUT = '[user_lists] logout',
}

export class UsersListRequestAction implements Action {
  readonly type = UsersActionsTypes.USERS_LIST_REQUEST;

}

export class UsersUpdateRequestAction implements Action {
  readonly type = UsersActionsTypes.USERS_UPDATE_REQUEST;

  constructor(public payload: any) {
  }
}

export class LoginRequestAction implements Action {
  readonly type = UsersActionsTypes.LOGIN_REQUEST;


  constructor(public payload: any) {
  }
}

export class UsersItemRequestAction implements Action {
  readonly type = UsersActionsTypes.USERS_ITEM_REQUEST;


  constructor(public payload: any) {
  }
}

export class UsersListErrorAction implements Action {
  readonly type = UsersActionsTypes.USERS_LIST_ERROR;

  constructor(public payload: any) {
  }
}

export class UsersUpdateErrorAction implements Action {
  readonly type = UsersActionsTypes.USERS_UPDATE_ERROR;

  constructor(public payload: any) {
  }
}

export class LoginErrorAction implements Action {
  readonly type = UsersActionsTypes.LOGIN_ERROR;

  constructor(public payload: any) {
  }
}

export class UsersItemErrorAction implements Action {
  readonly type = UsersActionsTypes.USERS_ITEM_ERROR;

  constructor(public payload: any) {
  }
}


export class UsersListSuccessAction implements Action {
  readonly type = UsersActionsTypes.USERS_LIST_SUCCESS;

  constructor(public payload: any) {
  }
}

export class UsersItemSuccessAction implements Action {
  readonly type = UsersActionsTypes.USERS_ITEM_SUCCESS;

  constructor(public payload: any) {
  }
}

export class UsersUpdateSuccessAction implements Action {
  readonly type = UsersActionsTypes.USERS_UPDATE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LoginSuccessAction implements Action {
  readonly type = UsersActionsTypes.LOGIN_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LogoutAction implements Action {
  readonly type = UsersActionsTypes.LOGOUT;

}

export type UsersActionsUnion =
  | UsersListRequestAction
  | UsersItemRequestAction
  | UsersListErrorAction
  | UsersItemErrorAction
  | UsersListSuccessAction
  | UsersItemSuccessAction
  | UsersUpdateRequestAction
  | UsersUpdateErrorAction
  | UsersUpdateSuccessAction
  | LoginErrorAction
  | LoginRequestAction
  | LoginSuccessAction
  | LogoutAction;
