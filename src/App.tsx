import React, { ChangeEvent, FC, useState } from "react";
import "./App.css";
import { ITask } from "./interfaces";
import Todo from "./Todo";
const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadLine, setDeadLine] = useState<number>(0);
  const [todolist, setTodolist] = useState<ITask[]>([]);
  const [editItemid, setEditItemId] = useState<number | null>(0);
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "task") {
      setTask(e.target.value);
    } else {
      setDeadLine(+e.target.value);
    }
  };
  const addTask = (): void => {
    const newtask = {
      taskName: task,
      deadline: deadLine,
      id: new Date().getTime(),
    };
    setTodolist([...todolist, newtask]);
    setTask("");
    setDeadLine(0);
  };

  const handleDelete = (id: number) => {
    setTodolist(todolist.filter((item) => item.id !== id));
  };


  const EditItem = (id: number) => {
    setEditItemId(id);
    todolist.map((item) => {
      if (item.id == id) {
        return setTask(item?.taskName), setDeadLine(item?.deadline);
      } else {
        return todolist;
      }
    });
  };
  const handleEditItem = () => {
    const data = todolist?.map((item) => {
      if (item.id == editItemid) {
        return { ...item, taskName: task, deadline: deadLine, id: editItemid };
      }
      return item;
    });
    console.log("dasta", data);
    setTodolist(data);
    setTask("");
    setDeadLine(0);
    setEditItemId(null);
  };

  return (
    <>
      <div className="App">
        <div className="header">
          <div className="inputContainer">
            <input
              name="task"
              value={task}
              onChange={handleChange}
              type="text"
              placeholder="Task..."
            ></input>
            <input
              onChange={handleChange}
              value={deadLine}
              name="deadline"
              type="number"
              placeholder="Timeline..."
            ></input>
          </div>
          {editItemid ? (
            <button onClick={handleEditItem}>Save</button>
          ) : (
            <button onClick={addTask}>Add</button>
          )}
        </div>
        <div className="todolist"></div>
      </div>

      <Todo
        todolist={todolist}
        handleDelete={handleDelete}
        EditItem={EditItem}
      />
    </>
  );
};

export default App;
