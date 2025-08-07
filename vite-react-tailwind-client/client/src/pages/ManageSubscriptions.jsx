import React, { useEffect, useState } from 'react';
import {
  getAllSubscriptions,
  deleteSubscription,
  updateSubscription,
} from '../services/SubscriptionService';

const ManageSubscriptions = () => {
  const [subs, setSubs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetchSubs();
  }, []);

  const fetchSubs = async () => {
    try {
      const data = await getAllSubscriptions();
      setSubs(data);
    } catch (err) {
      console.error('Failed to fetch subscriptions:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    try {
      await deleteSubscription(id);
      fetchSubs();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleEditClick = (sub) => {
    setEditId(sub._id);
    setForm({ ...sub });
  };

  const handleUpdate = async () => {
    try {
      await updateSubscription(editId, form);
      setEditId(null);
      fetchSubs();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6">Manage Subscriptions</h2>
        {subs.length === 0 ? (
          <p>No subscriptions found.</p>
        ) : (
          subs.map((sub) => (
            <div
              key={sub._id}
              className="border p-4 mb-4 rounded shadow bg-white"
            >
              {editId === sub._id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="border px-2 py-1 mr-2"
                  />
                  <input
                    type="number"
                    name="cost"
                    value={form.cost}
                    onChange={handleChange}
                    className="border px-2 py-1 mr-2"
                  />
                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="border px-2 py-1 mr-2"
                  />
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <strong>{sub.name}</strong> – ₹{sub.cost} –{' '}
                    {sub.category}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(sub.renewalDate).toLocaleDateString()} –{' '}
                    {sub.frequency}
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => handleEditClick(sub)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sub._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageSubscriptions;
