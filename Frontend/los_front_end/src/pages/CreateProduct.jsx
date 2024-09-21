// src/pages/CreateProduct.js
import React from 'react';

const CreateProduct = () => {
    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.heading}>Create New Product</h1>
            {/* Add your form for creating a product here */}
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
    heading: {
        fontSize: '2.5em',
        color: '#333',
    },
};

export default CreateProduct;
