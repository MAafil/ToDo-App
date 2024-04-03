import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { collection, getDocs, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { auth, firestore } from './firebaseConfig';
import Header from './components/Header/Header';
import Tasks from './components/Tasks/Tasks';
import Form from './components/Form/Form';
import Help from './components/Help/Help';
import NotFound from './components/NotFound/NotFound';
import AddTask from './components/Help/AddTask'; // Import AddTask component
import RemoveTask from './components/Help/RemoveTask'; // Import RemoveTask component
import ChangeStatus from './components/Help/ChangeStatus'; // Import ChangeStatus component
import uuid from 'react-uuid';
import './App.scss';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'tasks'));
        const fetchedTasks = [];
        querySnapshot.forEach((doc) => {
          fetchedTasks.push({ id: doc.id, ...doc.data() });
        });
        setTasks(fetchedTasks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching documents: ", error);
        setLoading(false); // Ensure setLoading is called even in case of error
      }
    };
  
    fetchData();
  }, []);
  
  const handleStatusChange = async (id) => {
    const taskRef = doc(firestore, 'tasks', id);
    const taskIndex = tasks.findIndex(task => task.id === id);
  
    const task = tasks[taskIndex];
    const newStatus = !task.done;
    const newStatusString = newStatus ? 'completed' : 'open';
  
    try {
      // Update Firestore
      await updateDoc(taskRef, {
        done: newStatus,
        status: newStatusString
      });
  
      // Update local state
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = { ...task, done: newStatus, status: newStatusString };
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating document: ", error);
      // Handle error
    }
  };
  

  const handleTaskRemove = async (id) => {
    const taskRef = doc(firestore, 'tasks', id);
    try {
      await deleteDoc(taskRef);
      const filteredTasks = tasks.filter(task => task.id !== id);
      setTasks(filteredTasks);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const handleClearTasks = () => {
    setTasks([]);
  };

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <div className="tasks-container">
          <Routes>
            <Route path="/" element={loading ? <p>Loading...</p> : <Tasks tasks={tasks} onStatusChange={handleStatusChange} onTaskRemove={handleTaskRemove} onClearTasks={handleClearTasks} />} />
            <Route path="/add" element={<Form onAddTask={handleAddTask} />} />
            <Route path="/help/*" element={<Help />}> {/* Update this line */}
  <Route index element={<Help />} />
              <Route path="add" element={<AddTask />} />
              <Route path="remove" element={<RemoveTask />} />
              <Route path="change" element={<ChangeStatus />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;