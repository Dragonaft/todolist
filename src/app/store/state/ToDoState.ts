import ToDo from '../../Interfaces/ToDoModel';

export default class ToDoState {
  ToDos: Array<ToDo>;
  ToDoError: Error;
}

export const initializeState = (): ToDoState => {
  return { ToDos: Array<ToDo>(), ToDoError: null };
};
