import React, { useState } from 'react';

const EditFlow = () => {
    const [workflowActions, setWorkflowActions] = useState([]);
    const [currentAction, setCurrentAction] = useState(null);
    const [actionName, setActionName] = useState('');
    const [isConfigVisible, setIsConfigVisible] = useState(false);

    const tools = [
        { id: 'submitAction', label: 'Submit Application' },
        { id: 'dropDown', label: 'Dropdown' },
        { id: 'inputForm', label: 'Input Form' },
        { id: 'banner', label: 'Banner' },
    ];

    const handleDragStart = (actionId) => {
        setCurrentAction(actionId);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (currentAction) {
            const newAction = {
                id: Date.now(),
                label: tools.find(tool => tool.id === currentAction).label,
                tag: `${currentAction}-${Date.now()}`, // Unique tag for each action
            };
            setWorkflowActions([...workflowActions, newAction]);
        }
    };

    const handleActionClick = (action) => {
        setActionName(action.label);
        setIsConfigVisible(true);
    };

    const handleSaveConfig = () => {
        setWorkflowActions(prev =>
            prev.map(action => (action.label === actionName ? { ...action, label: actionName } : action))
        );
        setIsConfigVisible(false);
    };

    const handleSubmit = async () => {
        const workflowData = {
            actions: workflowActions.map(action => ({
                label: action.label,
                tag: action.tag, // Include the unique tag in the request
            })),
        };

        try {
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(workflowData),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            console.log('Workflow submitted successfully:', result);
        } catch (error) {
            console.error('Error submitting workflow:', error);
        }
    };

    return (
        <div style={styles.container}>
            <header>
                <h1>Edit the Vendor Details</h1>
            </header>

            <main style={styles.main}>
                <section
                    style={styles.workflowDesigner}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                >
                    <h2>Workflow Panel</h2>
                    <div>
                        
                        <div style={styles.greyDiv}>
                        <h3 style={styles.screenNumber}>Screen 1</h3>
                        </div>
                    </div>
                    <div>
                        
                        <div style={styles.greyDiv}>
                        <h3 style={styles.screenNumber}>Screen 2</h3>
                        </div>
                    </div>
                </section>

                <section
                    style={styles.workflowDesigner}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                >
                    <h2>Screen Designer</h2>
                    <div style={styles.workflowArea}>
                        {workflowActions.length === 0 ? (
                            <p>Drag and drop actions here to create your workflow.</p>
                        ) : (
                            workflowActions.map(action => (
                                <div
                                    key={action.id}
                                    style={styles.tool}
                                    onClick={() => handleActionClick(action)}
                                >
                                    {action.label} {/* Removed the tag display */}
                                </div>
                            ))
                        )}
                    </div>
                </section>

                <section style={styles.toolbox}>
                    <h2>Toolbox</h2>
                    {tools.map(tool => (
                        <div
                            key={tool.id}
                            style={styles.tool}
                            draggable
                            onDragStart={() => handleDragStart(tool.id)}
                        >
                            {tool.label}
                        </div>
                    ))}
                </section>
            </main>

            {isConfigVisible && (
                <section style={styles.configuration}>
                    <h2>Configuration</h2>
                    <div>
                        <h3>Configure Action</h3>
                        <label htmlFor="actionName">Action Name:</label>
                        <input
                            type="text"
                            id="actionName"
                            value={actionName}
                            onChange={(e) => setActionName(e.target.value)}
                            placeholder="Enter action name"
                        />
                        <button onClick={handleSaveConfig}>Save Configuration</button>
                    </div>
                </section>
            )}

            <footer>
                <button onClick={handleSubmit} style={styles.submitButton}>Submit Workflow</button>
            </footer>
        </div>
    );
};

const styles = {
    container: {
        width: '90%',
        maxWidth: '1200px',
        margin: 'auto',
        overflow: 'hidden',
        backgroundColor: '#f4f4f4',
        fontFamily: 'Arial, sans-serif',
    },
    main: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '20px',
    },
    toolbox: {
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        flex: '1 1 33%', // Changed to make it take 1/3 of the space
    },
    tool: {
        background: '#007bff',
        color: 'white',
        padding: '10px',
        margin: '5px',
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    workflowDesigner: {
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        flex: '1 1 33%', // Changed to make it take 1/3 of the space
    },
    workflowArea: {
        minHeight: '200px',
        border: '2px dashed #007bff',
        padding: '10px',
    },
    greyDiv: {
        background: 'lightgrey',
        height: '50px', // Adjust height as needed
        margin: '10px 0',
        borderRadius: '5px',
    },
    screenNumber: {
        margin: '10px 0',
    },
    configuration: {
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        margin: '10px',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default EditFlow;
