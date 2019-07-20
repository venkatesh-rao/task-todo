import * as React from "react";
import { Button, Checkbox, Divider, Header, Input } from "semantic-ui-react";
import { TaskType, StateType } from "../TodoList/TodoList";

const styles = {
  header: { textTransform: "uppercase", fontWeight: 500 },
  flexRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  btn: { color: "#848484", background: "none", fontWeight: 500, padding: 10 }
};

interface TaskCategoryType {
  name: string;
  label: string;
}

interface TaskProps {
  taskId: string;
  taskName?: string;
  taskLabel: string;
  isTaskCompleted: boolean;
  onChange: any;
}

const taskStates: TaskCategoryType[] = [
  { name: "todo", label: "Todo" },
  { name: "completed", label: "Completed" }
];

const Task: React.FunctionComponent<TaskProps> = ({
  taskId,
  taskLabel,
  isTaskCompleted,
  onChange
}: TaskProps): JSX.Element => {
  const [isFocused, setFocus] = React.useState(false);
  const [newLabelVal, setNewLabelVal] = React.useState(taskLabel);
  return (
    <>
      <div id={`task_${taskId}`} style={styles.flexRow}>
        <div style={{ ...styles.flexRow, flexGrow: 1 }}>
          <Checkbox
            label=""
            checked={isTaskCompleted}
            onChange={(_: any, __: any) =>
              onChange({
                type: isTaskCompleted ? "set-incomplete" : "set-complete",
                todoId: taskId
              })
            }
          />
          <Input
            size={!isFocused ? "small" : "mini"}
            style={{ width: "100%" }}
            disabled={!isFocused}
            transparent={!isFocused}
            placeholder=""
            value={newLabelVal}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNewLabelVal(event.target.value);
            }}
          />
        </div>
        <Button
          style={styles.btn}
          onClick={() => {
            setFocus(!isFocused);
            if (isFocused) {
              onChange({
                type: "change-name",
                todoId: taskId,
                newLabel: newLabelVal
              });
            }
          }}
        >
          {isFocused ? "Save" : "Edit"}
        </Button>
        <Button style={styles.btn}>Add</Button>
      </div>
      <Divider />
    </>
  );
};

interface TodosProps {
  todos: StateType;
  onChange: React.Dispatch<any>;
}

const Todos: React.FunctionComponent<TodosProps> = ({
  onChange,
  todos
}: TodosProps): JSX.Element => {
  return (
    <>
      {taskStates.map((item: TaskCategoryType) => (
        <div key={item.name}>
          <Header size="medium" as="h4" dividing style={styles.header}>
            {item.label}
          </Header>
          {item.name === "todo"
            ? todos.uncompletedTasks.map((todo: TaskType) => {
                const { id, label, isCompleted } = todo;
                return (
                  <Task
                    key={id}
                    taskId={id}
                    taskLabel={label}
                    isTaskCompleted={isCompleted}
                    onChange={onChange}
                  />
                );
              })
            : todos.completedTasks.map((todo: TaskType) => {
                const { id, label, isCompleted } = todo;
                return (
                  <Task
                    key={id}
                    taskId={id}
                    taskLabel={label}
                    isTaskCompleted={isCompleted}
                    onChange={onChange}
                  />
                );
              })}
        </div>
      ))}
    </>
  );
};

export default Todos;
