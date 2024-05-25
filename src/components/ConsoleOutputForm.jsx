
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import FormData from "form-data";
import { Modal } from 'antd'; // Import the Modal component
// import "./App.css";
import "./modal.css"

//import 'bootstrap/dist/css/bootstrap.min.css';





const ConsoleOutputForm = forwardRef(({ projectUrl, jenkinsUrl, jenkinsUsername }, ref) => {
    const [consoleOutput, setConsoleOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [intervalId, setIntervalId] = useState(null);

    const fetchConsoleOutput = async () => {
        const apiUrl = import.meta.env.VITE_APP_API_URL;
        let data = new FormData();
        data.append('jenkins_url', jenkinsUrl);
        data.append('jenkins_username', jenkinsUsername);
        data.append('project_url', projectUrl);

        let config = {
            method: 'post',
            url: `${apiUrl}get_console_output`,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: data
        };

        try {
            const response = await axios(config);
            setConsoleOutput(response.data);
            setLoading(false);
            clearInterval(intervalId);
        } catch (error) {
            console.error('Error fetching console output:', error);
        }
    };

    const handleSubmit = () => {
        setLoading(true);
        const newIntervalId = setInterval(fetchConsoleOutput, 1000);
        setIntervalId(newIntervalId);
    };

    useImperativeHandle(ref, () => ({
        handleSubmit
    }));

    const handleToggleModal = () => {
        //console.log('Toggling modal'); // Log when the modal is being toggled
        setShowModal(!showModal);
    };

    return (
        <header>
            <form onSubmit={handleSubmit} disabled={loading}>
            </form>
            <br></br>
            <button onClick={handleToggleModal}>
                {showModal ? 'Hide Console Output' : 'Show Console Output'}
            </button>

            <Modal

                className='modal'
                title="Console Output"
                open={showModal}
                onCancel={handleToggleModal}
                footer={null}
                theme="dark"
                width={1100}
            >
                {loading ? <p>Loading console output...</p> : <pre>{consoleOutput}</pre>}
            </Modal>
        </header>
    );
});

export default ConsoleOutputForm;



// /* eslint-disable no-unused-vars */

// import React, { useState, forwardRef, useEffect, useImperativeHandle } from 'react';
// import PropTypes from 'prop-types';
// import axios from 'axios';
// import FormData from "form-data";
// import { Modal, Button } from 'antd';
// import "./../App.css";
// import "./modal.css";

// /* eslint-disable react/display-name */

// const ConsoleOutputForm = forwardRef(({ projectUrl, gitlabUrl, jenkinsUrl, jenkinsUsername }, ref) => {
//     const [consoleOutput, setConsoleOutput] = useState('');
//     const [showModal, setShowModal] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const fetchConsoleOutput = async () => {
//         try {
//             setLoading(true);
//             const apiUrl = import.meta.env.VITE_APP_API_URL;
//             const data = new FormData();
//             data.append('jenkins_url', jenkinsUrl);
//             data.append('jenkins_username', jenkinsUsername);
//             data.append('project_url', projectUrl);
//             data.append('gitlab_url', gitlabUrl);

//             const config = {
//                 method: 'POST',
//                 url: `${apiUrl}log`,
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 data: data
//             };

//             const response = await axios(config);
//             setConsoleOutput(response.data);
//             setShowModal(true);
//         } catch (error) {
//             console.error('Error fetching console output:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useImperativeHandle(ref, () => ({
//         fetchConsoleOutput
//     }));

//     const handleCloseModal = () => {
//         setShowModal(false);
//     };

//     useEffect(() => {
//         if (consoleOutput) {
//             setShowModal(true);
//         }
//     }, [consoleOutput]);

//     return (
//         <div>
//             <button onClick={fetchConsoleOutput} disabled={loading}>
//                 {loading ? "Chargement..." : "Afficher console"}
//             </button>
//             {showModal && (
//                 <Modal
//                     title="Console Output"
//                     visible={showModal}
//                     onCancel={handleCloseModal}
//                     footer={[
//                         <Button key="refresh" onClick={fetchConsoleOutput}>
//                             Rafraîchir
//                         </Button>,
//                         <Button key="back" onClick={handleCloseModal}>
//                             Fermer
//                         </Button>
//                     ]}
//                     className="custom-modal" // Ajoutez cette classe pour appliquer les styles personnalisés
//                 >
//                     <pre>{consoleOutput}</pre>
//                 </Modal>

//             )}
//         </div>
//     );
// });

// ConsoleOutputForm.propTypes = {
//     projectUrl: PropTypes.string.isRequired,
//     gitlabUrl: PropTypes.string.isRequired,
//     jenkinsUrl: PropTypes.string.isRequired,
//     jenkinsUsername: PropTypes.string.isRequired
// };

// export default ConsoleOutputForm;


