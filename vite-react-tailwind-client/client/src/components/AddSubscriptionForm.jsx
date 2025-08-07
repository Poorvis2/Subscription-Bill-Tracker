// AddSubscriptionForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as subscriptionService from '../services/SubscriptionService';

const AddSubscriptionForm = () => {
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [frequency, setFrequency] = useState('monthly');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSubscription = {
            name,
            cost,
            frequency,
            dueDate,
            category,
            notes,
        };

        try {
            const res = await subscriptionService.addSubscription(newSubscription);
            if (res.status === 201) { // 201 Created
                setMessage('Subscription added successfully! 🎉');
                // Redirect to the dashboard after a short delay
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                setMessage('Failed to add subscription. Please try again.');
            }
        } catch (error) {
            console.error('Error adding subscription:', error);
            setMessage('An error occurred. Please check your network and try again.');
        }
    };

    return (
        <div className="add-subscription-container">
            <h2>Add Subscription</h2>
            <form onSubmit={handleSubmit}>
                {/* Form inputs for name, cost, etc. */}
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="Cost"
                    required
                />
                <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                </select>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                />
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Notes"
                ></textarea>
                <button type="submit">Add</button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default AddSubscriptionForm;