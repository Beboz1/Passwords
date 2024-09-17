import React, { useState } from 'react';
const { savePassword } = require('@electron/remote').require('./storage');

const PasswordForm = () => {
    const [service, setService] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        savePassword(service, password);
        setService('');
        setPassword('');
        alert('Password saved!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Service:</label>
                <input type="text" value={service} onChange={(e) => setService(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Save Password</button>
        </form>
    );
};

export default PasswordForm;
