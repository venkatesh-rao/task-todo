import * as React from "react";
import { Header } from "semantic-ui-react";
import Todos from "../Todos";

interface StyleType {
  [key: string]: React.CSSProperties;
}

const styles: StyleType = {
  header: { textTransform: "uppercase", fontWeight: 500, color: "#dedede" }
};

export interface TaskType {
  id: string;
  name: string;
  label: string;
  isCompleted: boolean;
}

const initialState = {
  completedTasks: [
    {
      id: "test_task_02",
      name: "create the door",
      label: "Create the door",
      isCompleted: true
    }
  ],
  uncompletedTasks: [
    {
      id: "test_task_23",
      name: "lock the door",
      label: "Lock the door",
      isCompleted: false
    }
  ]
};

export type StateType = typeof initialState;

type Action =
  | { type: "set-complete"; todoId: string; newLabel?: string }
  | { type: "set-incomplete"; todoId: string; newLabel?: string }
  | { type: "change-name"; todoId: string; newLabel: string };

const reducer = (state: any, action: Action) => {
  const { type, todoId, newLabel = "" } = action;
  switch (type) {
    case "set-complete": {
      const taskObj = state.uncompletedTasks.find(
        (item: any) => item.id === todoId
      );
      return {
        ...state,
        completedTasks: [
          ...state.completedTasks,
          { ...taskObj, isCompleted: true }
        ],
        uncompletedTasks: state.uncompletedTasks.filter(
          (item: any) => item.id !== todoId
        )
      };
    }
    case "set-incomplete": {
      const taskObj = state.completedTasks.find(
        (item: any) => item.id === todoId
      );
      return {
        ...state,
        uncompletedTasks: [
          ...state.uncompletedTasks,
          { ...taskObj, isCompleted: false }
        ],
        completedTasks: state.completedTasks.filter(
          (item: any) => item.id !== todoId
        )
      };
    }
    case "change-name": {
      const cObj = state.completedTasks.map((o: any, i: number) => {
        if (o.id === todoId) {
          return {
            ...o,
            label: newLabel,
            name: newLabel.toLowerCase()
          };
        }
        return o; // stop searching
      });
      const uObj = state.uncompletedTasks.map((o: any, i: number) => {
        if (o.id === todoId) {
          return {
            ...o,
            label: newLabel,
            name: newLabel.toLowerCase()
          };
        }
        return o; // stop searching
      });
      console.log(todoId, cObj, uObj);
      return { ...state, completedTasks: cObj, uncompletedTasks: uObj };
    }
    default:
      return state;
  }
};

interface TodoListProps {}

const TodoList: React.FunctionComponent<TodoListProps> = () => {
  const [state, dispatch]: any = React.useReducer(reducer, initialState);
  return (
    <>
      <Header size="medium" as="h5" style={styles.header}>
        TodoList
      </Header>
      <Todos todos={state} onChange={dispatch} />
    </>
  );
};

export default TodoList;
