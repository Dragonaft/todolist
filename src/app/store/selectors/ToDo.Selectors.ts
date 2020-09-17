import {createFeatureSelector, createSelector} from '@ngrx/store';

export const selectTodoState = createFeatureSelector('todo');
export const selectTodoItems = createSelector(selectTodoState, (state: any) => state.item);

