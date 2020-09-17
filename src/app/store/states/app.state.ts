import { RouterReducerState } from '@ngrx/router-store';
import { InterfaceUserState, initialUserState} from '../state/user.state';

export interface InterfaceAppState {
  router?: RouterReducerState;
  user: InterfaceUserState;
}

export const initialAppState: InterfaceAppState = {
  user: initialUserState
};

export function getInitialState(): InterfaceAppState {
  return initialAppState;
}

