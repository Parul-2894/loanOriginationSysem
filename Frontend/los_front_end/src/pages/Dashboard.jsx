import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Modal from '../components/Modal';
import productData from '../products.json'; // Adjust path as needed

const Dashboard = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    // State variables for product details
    const [productId, setProductId] = useState('');
    const [company, setCompany] = useState('');
    const [productName, setProductName] = useState('');
    const [principalAmount, setPrincipalAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [repaymentSchedule, setRepaymentSchedule] = useState('');
    const [collateral, setCollateral] = useState('');
    const [loanType, setLoanType] = useState('');
    const [feesAndCharges, setFeesAndCharges] = useState('');
    const [creditScoreRequirements, setCreditScoreRequirements] = useState('');
    const [gracePeriod, setGracePeriod] = useState('');
    const [loanCovenants, setLoanCovenants] = useState('');
    const [workflowConfigurationPath, setWorkflowConfigurationPath] = useState('');
    const [loanProducts, setLoanProducts] = useState(productData); // Initialize with local data

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset error message on form submission
        setIsModalOpen(false);
    
        const newProduct = {
            product_id: productId,
            product_name: productName,
            principal_amount: parseFloat(principalAmount),
            interest_rate: parseFloat(interestRate),
            loan_term: parseInt(loanTerm, 10),
            repayment_schedule: repaymentSchedule,
            collateral: collateral,
            loan_type: loanType,
            fees_and_charges: parseFloat(feesAndCharges),
            credit_score_requirements: parseInt(creditScoreRequirements, 10),
            grace_period: parseInt(gracePeriod, 10),
            loan_covenants: loanCovenants,
            workflow_configuration_path: workflowConfigurationPath,
        };
    
        try {
            const response = await fetch('https://your-api-endpoint.com/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
    
            if (!response.ok) {
                throw new Error('Failed to create product');
            }
    
            const savedProduct = await response.json();
            setLoanProducts((prevProducts) => [...prevProducts, savedProduct]);
            resetForm(); // Reset form before closing the modal
            setIsModalOpen(false); // Close the modal after getting a successful response
            navigate('/dashboard'); // Redirect to dashboard on success
        } catch (error) {
            console.error('Error creating product:', error);
            setErrorMessage("Can't create the product. Please try again."); // Set error message
        }
    };
    

    const resetForm = () => {
        setProductId('');
        setCompany('');
        setProductName('');
        setPrincipalAmount('');
        setInterestRate('');
        setLoanTerm('');
        setRepaymentSchedule('');
        setCollateral('');
        setLoanType('');
        setFeesAndCharges('');
        setCreditScoreRequirements('');
        setGracePeriod('');
        setLoanCovenants('');
        setWorkflowConfigurationPath('');
    };

    return (
        <div style={styles.pageContainer}>
            {errorMessage && <div style={styles.errorRibbon}>{errorMessage}</div>}
            <h1 style={styles.heading}>Loan Products</h1>
            <div style={styles.productContainer}>
    {loanProducts.map((product) => (
        <div key={product.product_id} style={styles.productCard}>
            <h2 style={styles.productName}>{product.product_name}</h2>
            <p style={styles.productDescription}>
                {`Principal Amount: $${product.principal_amount}, Interest Rate: ${product.interest_rate}%`}
            </p>
            <div style={styles.linkContainer}>
            <Link to={`/edit-flow/${product.product_id}`} style={styles.link}>Edit</Link>
            </div>
        </div>
    ))}
</div>

            <button onClick={() => setIsModalOpen(true)} style={styles.button}>
                Create New Product
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Create New Product</h2>
                <form onSubmit={handleCreateProduct} style={styles.form}>
                <input
                        type="text"
                        placeholder="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Product ID"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="number"
                        placeholder="Principal Amount"
                        value={principalAmount}
                        onChange={(e) => setPrincipalAmount(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="number"
                        placeholder="Interest Rate"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="number"
                        placeholder="Loan Term (Months)"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Repayment Schedule"
                        value={repaymentSchedule}
                        onChange={(e) => setRepaymentSchedule(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Collateral"
                        value={collateral}
                        onChange={(e) => setCollateral(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Loan Type"
                        value={loanType}
                        onChange={(e) => setLoanType(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="number"
                        placeholder="Fees and Charges"
                        value={feesAndCharges}
                        onChange={(e) => setFeesAndCharges(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="number"
                        placeholder="Credit Score Requirements"
                        value={creditScoreRequirements}
                        onChange={(e) => setCreditScoreRequirements(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="number"
                        placeholder="Grace Period (Months)"
                        value={gracePeriod}
                        onChange={(e) => setGracePeriod(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <textarea
                        placeholder="Loan Covenants"
                        value={loanCovenants}
                        onChange={(e) => setLoanCovenants(e.target.value)}
                        style={{ ...styles.input, height: '100px' }}
                    />
                    <input
                        type="text"
                        placeholder="Workflow Configuration Path"
                        value={workflowConfigurationPath}
                        onChange={(e) => setWorkflowConfigurationPath(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>
                        Add Product
                    </button>
                </form>
            </Modal>
        </div>
    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f0f8ff',
        minHeight: 'calc(100vh - 100px)',
    },
    errorRibbon: {
        width: '100%',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        padding: '10px',
        textAlign: 'center',
        marginBottom: '20px',
    },
    heading: {
        fontSize: '2.5em',
        color: '#333',
        marginBottom: '20px',
    },
    productContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '600px',
        marginBottom: '20px',
    },
    productCard: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    productName: {
        fontSize: '1.5em',
        color: '#007bff',
    },
    productDescription: {
        color: '#555',
    },
    button: {
        padding: '10px 15px',
        fontSize: '1em',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    input: {
        width: '70%',
        marginBottom: '15px',
        padding: '10px',
        fontSize: '1em',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
};

export default Dashboard;
