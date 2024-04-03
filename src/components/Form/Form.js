// src/components/Form/Form.js
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig'; // Import firestore from firebaseConfig
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Form.scss';

function Form({ onAddTask }) {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('open');
  const [errorMessage, setErrorMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (description.trim() === '') {
      setErrorMessage('Enter a description');
    } else {
      setErrorMessage('');
      setSaving(true);
      try {
        const docRef = await addDoc(collection(firestore, 'tasks'), {
          description: description,
          status: status
        });
        onAddTask({ id: docRef.id, description: description, done: status === 'completed' });
        setDescription('');
        setStatus('open');
        navigate('/'); // Redirect to tasks page
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Add a new task:</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          maxLength="150"
          value={description}
          onChange={handleDescriptionChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select id="status" value={status} onChange={handleStatusChange} className="form-control">
          <option value="open">Open</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="button-container">
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? "Saving..." : "Add"}
        </button>
      </div>
    </form>
  );
}

export default Form;
