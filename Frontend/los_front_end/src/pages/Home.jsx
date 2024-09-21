import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Home = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: '1',
            textAlign: 'center',
            backgroundColor: '#f0f8ff',
            padding: '50px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            minHeight: 'calc(100vh - 100px)', // Adjust this to avoid footer overlap
        },
        heading: {
            fontSize: '2.5em',
            color: '#333',
            marginBottom: '30px',
        },
        button: {
            margin: '10px',
            padding: '15px 30px',
            fontSize: '1.2em',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={styles.container}>
                <h1 style={styles.heading}>Welcome to Loan Origination System!</h1>
                <div>
                    <Link to="/login">
                        <button 
                            style={styles.button} 
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor} 
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                        >
                            Sign in as Lender
                        </button>
                    </Link>
                    <Link to="/contact">
                        <button 
                            style={styles.button} 
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor} 
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                        >
                            Login to apply for loan
                        </button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
