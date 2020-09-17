import ToDoState, { initializeState } from '../state/ToDoState';
import ActionWithPayload from '../actions/ActionWithPayload';
import ToDo from '../../Interfaces/ToDoModel';
import * as ToDoActions from '../actions/todo.action';
import { Action, createReducer, on } from '@ngrx/store';

export const intialState = initializeState();

const reducer = createReducer(
  intialState,
  on(ToDoActions.GetToDoAction, state => state),
  on(ToDoActions.CreateToDoAction, (state: ToDoState, todo: ToDo) => {
    return { ...state, ToDos: [...state.ToDos, todo], ToDoError: null };
  }),
  on(ToDoActions.SuccessGetToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: payload };
  }),
  on(ToDoActions.SuccessCreateToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, ToDos: [...state.ToDos, payload], ToDoError: null };
  }),
  on(ToDoActions.ErrorToDoAction, (state: ToDoState, error: Error) => {
    console.log(error);
    return { ...state, ToDoError: error };
  }),
  on(ToDoActions.DeleteToDoAction, (state: ToDoState) => {
    return { ...state};
  }));

// tslint:disable-next-line:typedef
export function ToDoReducer(state: ToDoState | undefined, action: Action) {
  return reducer(state, action);
}
