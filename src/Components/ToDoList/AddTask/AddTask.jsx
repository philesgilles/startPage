import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./AddTask.css";
const AddTask = props => {
  return (
    <div className="addTaskForm">
      <form>
        <label htmlFor="task">Task :</label>
        <textarea name="task" id="" rows="5"></textarea>
        <label htmlFor="importance">importance</label>
        <select name="importance" id="">
          <option value="0">Not important</option>
          <option value="1">Normal</option>
          <option value="2">Important</option>
        </select>
        <label htmlFor="dueDate">Due date</label>
        <input type="date" name="dueDate" />
      </form>
    </div>
  );
};

export default AddTask;
