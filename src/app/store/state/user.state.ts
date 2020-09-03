import {UserInterface} from '../../Interfaces/UserInterface';

export interface UserInterfaceState {
  users: UserInterface[];
  selectedUser: UserInterface;
}

export const initialUserState: UserInterfaceState = {
  users: null,
  selectedUser: null
};
