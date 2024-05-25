// /* eslint-disable no-unused-vars */

// import React, { useState, forwardRef, useImperativeHandle } from 'react';
// import PropTypes from 'prop-types'; // Importez PropTypes depuis la bibliothèque prop-types
// import axios from 'axios';
// import FormData from "form-data";
// // import "./App.css";

// /* eslint-disable react/display-name */

// const ProxyForm = forwardRef(({ sitename }, ref) => {
//     const [response, setResponse] = useState(null);

//     const handleproxyForm = async (event) => {
//         const apiUrl = import.meta.env.VITE_APP_API_URL;

//         let data = new FormData();
//         data.append('site_name', sitename);

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: `${apiUrl}proxy`,
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             },
//             data: data
//         };

//         try {
//             const response = await axios(config);
//             setResponse(JSON.stringify(response.data));
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useImperativeHandle(ref, () => ({
//         handleproxyForm
//     }));
//     return (
//         <header>
//             <form onSubmit={handleproxyForm}>
//             </form>
//             <h4><pre>{response}</pre></h4>
//         </header>
//     );
// });

// // Ajoutez la validation des props
// ProxyForm.propTypes = {
//     sitename: PropTypes.string.isRequired
// };

// export default ProxyForm;


import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import axios from 'axios';
import FormData from "form-data";
import "./Apps.css";


const ProxyForm = forwardRef(({ site_name }, ref) => {
    const [response, setResponse] = useState(null);



    useEffect(() => {
        const eventSource = new EventSource('/proxy');
        eventSource.onmessage = function (event) {
            const result = JSON.parse(event.data);
            console.log(result);
            setResponse(JSON.stringify(result));
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const handleSubmit = async (event) => {

        const apiUrl = import.meta.env.VITE_APP_API_URL;

        let data = new FormData();
        data.append('site_name', site_name);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${apiUrl}proxy`,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: data
        };

        try {
            const response = await axios(config);
            setResponse(JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        }
    };

    useImperativeHandle(ref, () => ({
        handleSubmit
    }));

    return (
        <header className='repo'>
            <form onSubmit={handleSubmit}>
                {/* <label>
            Site Name:
            <input type="text" value={site_name} onChange={e => setSiteName(e.target.value)} />
          </label> */}

            </form>
            <h4><pre>{response}</pre></h4>
        </header>
    );
});


export default ProxyForm;
