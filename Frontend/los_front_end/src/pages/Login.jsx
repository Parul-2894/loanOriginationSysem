// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [isNewUser, setIsNewUser] = useState(false);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulated login check
        if (userId === 'test' && password === 'password') {
            navigate('/dashboard'); // Redirect to dashboard on success
        } else {
            alert('Invalid credentials');
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log('Sign Up:', { userId, password });
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.formContainer}>
                <h1 style={styles.heading}>{isNewUser ? 'Create Account' : 'Login'}</h1>
                <form onSubmit={isNewUser ? handleSignUp : handleLogin} style={styles.form}>
                    <input
                        type="text"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
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
                    <button type="submit" style={styles.button}>
                        {isNewUser ? 'Create Account' : 'Login'}
                    </button>
                </form>
                <p style={styles.toggleText} onClick={() => setIsNewUser(!isNewUser)}>
                    {isNewUser ? 'Already have an account? Login here' : 'New user? Create an account'}
                </p>
                {!isNewUser && (
                    <p style={styles.toggleText}>
                         <Link to="/register">create an account</Link>.
                    </p>
                )}
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 100px)',
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
        width: '300px',
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
    toggleText: {
        marginTop: '15px',
        color: '#007bff',
        cursor: 'pointer',
    },
};

export default Login;
