// src/pages/Register.js
import React, { useState } from 'react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [captchaValue] = useState(Math.floor(Math.random() * 10000)); // Simple random captcha

    const handleRegister = (e) => {
        e.preventDefault();
        // Handle registration logic here
        console.log('Register:', { name, email, contactNumber, password, companyName, captcha });
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.formContainer}>
                <h1 style={styles.heading}>Create Account</h1>
                <form onSubmit={handleRegister} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Contact Number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Company Registration ID"
                        value={companyId}
                        onChange={(e) => setCompanyId(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <div style={styles.captchaContainer}>
                        <input
                            type="text"
                            placeholder="Enter Captcha"
                            value={captcha}
                            onChange={(e) => setCaptcha(e.target.value)}
                            style={styles.input}
                            required
                        />
                        <span style={styles.captcha}>{captchaValue}</span>
                    </div>
                    <button type="submit" style={styles.button}>Register</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 100px)', // Adjust for footer height
        backgroundColor: '#f0f8ff',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: '300px', // Fixed width for the form
    },
    heading: {
        fontSize: '2em',
        color: '#333',
        marginBottom: '30px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    input: {
        marginBottom: '15px',
        padding: '10px',
        fontSize: '1em',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        fontSize: '1em',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    captchaContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    captcha: {
        marginLeft: '10px',
        fontWeight: 'bold',
        color: '#007bff',
    },
};

export default Register;
