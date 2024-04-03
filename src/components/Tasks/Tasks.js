// Tasks.js
import React from 'react';
import Task from './Task/Task';
import './Tasks.scss';

function Tasks({ tasks, onStatusChange, onTaskRemove, onClearTasks }) {
  return (
    <div>
      <h2>These are the tasks:</h2>
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          index={index + 1} // Numerical index starting from 1
          onStatusChange={onStatusChange}
          onTaskRemove={onTaskRemove}
        />
      ))}
      <hr />
      <button onClick={onClearTasks}>Clear Tasks</button>
    </div>
  );
}

export default Tasks;
