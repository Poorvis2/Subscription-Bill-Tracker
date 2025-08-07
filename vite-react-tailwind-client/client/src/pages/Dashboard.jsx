// Dashboard.jsx

import React, { useState, useEffect } from 'react';
import * as subscriptionService from '../services/SubscriptionService';

const Dashboard = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                setLoading(true);
                const data = await subscriptionService.getSubscriptions(); // You'll need to create this function
                setSubscriptions(data);
            } catch (err) {
                setError('Failed to fetch subscriptions. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptions();
    }, []);

    if (loading) {
        return <div>Loading subscriptions...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <h2>Your Subscriptions</h2>
            {subscriptions.length === 0 ? (
                <p>No subscriptions found. <a href="/add-subscription">Add one now!</a></p>
            ) : (
                <div className="subscriptions-list">
                    {subscriptions.map((sub) => (
                        <div key={sub._id} className="subscription-card">
                            <h3>{sub.name}</h3>
                            <p>Cost: ${sub.cost}</p>
                            <p>Due Date: {new Date(sub.dueDate).toLocaleDateString()}</p>
                            {/* You can add more details here */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;