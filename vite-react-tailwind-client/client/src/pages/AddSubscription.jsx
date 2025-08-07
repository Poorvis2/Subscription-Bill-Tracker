// src/pages/AddSubscription.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSubscription } from '../services/SubscriptionService';


export default function AddSubscription() {
  const [form, setForm] = useState({
    name: '',
    cost: '',
    frequency: 'Monthly',
    dueDate: '',
    category: '',
    notes: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSubscription(form);
      setSuccess('Subscription added!');
      setError('');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setError('Failed to add subscription');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Add Subscription</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="number" name="cost" placeholder="Cost" value={form.cost} onChange={handleChange} required />
        <select name="frequency" value={form.frequency} onChange={handleChange}>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
        <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange}></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
    </div>
  );
}
