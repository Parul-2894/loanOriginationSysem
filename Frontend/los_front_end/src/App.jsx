import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateProduct from './pages/CreateProduct';
import EditFlow from './pages/EditFlow';
// import LosWorkflow from './pages/LosWorkflow';
const App = () => {
    return (
        <Router>
            {/* <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />}/>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-product" element={<CreateProduct />} />
                <Route path="/edit-flow/:id" element={<EditFlow />} />
                {/* <Route path="/workflow" element={<LosWorkflow />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
