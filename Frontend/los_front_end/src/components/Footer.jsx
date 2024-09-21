// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <p style={styles.text}>© 2024 My LOS App. All rights reserved by CodeInnovator.</p>
        </footer>
    );
};

const styles = {
    footer: {
        padding: '20px',
        backgroundColor:'#007bff',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        width: '100%',
    },
    text: {
        margin: '0',
    },
};

export default Footer;
