// Task.js
import React from 'react';
import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../../firebaseConfig';

function Task({ task, index, onStatusChange, onTaskRemove }) {
  const handleStatusClick = async () => {
    const id = task.id;
    const taskRef = doc(firestore, 'tasks', id);
    await updateDoc(taskRef, {
      done: !task.done
    }).catch(error => console.error('Error updating task:', error));
    onStatusChange(id);
  };

  const handleRemoveClick = async () => {
    const id = task.id;
    const taskRef = doc(firestore, 'tasks', id);
    await deleteDoc(taskRef).catch(error => console.error('Error removing task:', error));
    onTaskRemove(id);
  };

  return (
    <div>
      <hr />
      <h3>{task.description}</h3>
      <div>ID: {index}</div> {/* Display numerical index */}
      <div>Status: {task.done ? 'Completed' : 'Open'}</div>
      <button onClick={handleStatusClick}>Change Status</button>
      <button onClick={handleRemoveClick}>Remove Task</button>
    </div>
  );
}

export default Task;

