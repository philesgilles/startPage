import React, { useState, useEffect } from "react";

import "./ToDoList.css";

const ToDo = () => {
  const [tasks, setTasks] = useState([
    {
      task: "Add remove toDo possibility",
      importance: "1",
      done: false,
      dueDate: "2019-12-12",
      id: 0
    },
    {
      task: "Add localStorage todozz",
      importance: "2",
      done: false,
      dueDate: "2019-12-12",
      id: 1
    },
    {
      task: "Check the beauty of the home page",
      importance: "0",
      done: false,
      dueDate: "2019-12-12",
      id: 2
    }
  ]);
  //Set new tasks states
  const [newTask, setNewTask] = useState({
    task: "",
    importance: "0",
    done: false,
    dueDate: "",
    id: tasks.length + 1
  });

  const [errorTask, setErrorTask] = useState({
    task: false,
    dueDate: false
  });

  useEffect(
    e => {
      //
    },
    [tasks]
  );

  const addTask = e => {
    e.preventDefault();
    console.log(newTask);

    // Check errors

    if (newTask.task.length === 0) {
      console.log(newTask.task.length);
      setErrorTask({ ...errorTask, task: true });
      return;
    } else {
      setErrorTask({ ...errorTask, task: false });
    }

    if (newTask.dueDate.length === 0) {
      setErrorTask({ ...errorTask, dueDate: true });
      console.log("ERRROR ! DUEDATE");
      return;
    }

    console.log(errorTask);

    setTasks([...tasks, newTask]);
    setNewTask({ ...newTask, id: newTask.id + 1, task: "", dueDate: "" });
    setErrorTask({
      task: false,
      dueDate: false
    });
  };
  let list = (
    <tr>
      <td>No tasks yet</td>
      <td>No tasks yet</td>
      <td>No tasks yet</td>
      <td>No tasks yet</td>
      <td>No tasks yet</td>
    </tr>
  );
  if (tasks.length > 0) {
    list = tasks.map(task => {
      let date = task.dueDate.split("-");
      date = `${date[2]}/${date[1]}/${date[0]}`;
      return (
        <tr key={task.id}>
          <td style={{ textAlign: "center" }}>
            <div className="form-group">
              <input type="checkbox" defaultValue="" id={task.id} />
              <label htmlFor={task.id}></label>
            </div>
          </td>
          <td>{date}</td>
          <td>{task.task}</td>
          <td>
            {task.importance === "0" && <p style={{ color: "blue" }}>Low</p>}
            {task.importance === "1" && (
              <p style={{ color: "green" }}>Medium</p>
            )}
            {task.importance === "2" && <p style={{ color: "red" }}>High</p>}
          </td>
          <td>
            <i class="fa fa-lg fa-trash pointer" aria-hidden="true"></i>
          </td>
        </tr>
      );
    });
  }

  return (
    <React.Fragment>
      <h2>To Do List</h2>
      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Due date</th>
              <th className="taskTable">Task</th>
              <th>Importance</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
      <h2>Add a todo</h2>
      <div className="addTaskForm">
        <form>
          <label htmlFor="task">Task :</label>
          <textarea
            name="task"
            id=""
            rows="5"
            required
            value={newTask.task}
            onChange={e => setNewTask({ ...newTask, task: e.target.value })}
          ></textarea>
          <label htmlFor="importance">importance</label>
          <select
            name="importance"
            id=""
            onChange={e =>
              setNewTask({ ...newTask, importance: e.target.value })
            }
            value={newTask.importance}
          >
            <option value="0">Low</option>
            <option value="1">Normal</option>
            <option value="2">High</option>
          </select>
          <label htmlFor="dueDate">Due date</label>
          <input
            className={errorTask.dueDate ? "has-error" : ""}
            type="date"
            name="dueDate"
            onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
            value={newTask.dueDate}
          />
          <input type="submit" value="Add new task" onClick={addTask} />
        </form>
      </div>
    </React.Fragment>
  );
};

export default ToDo;
