// /* eslint-disable no-unused-vars */

// import React, { useState, useRef } from 'react';
// import DockerizeForm from './DockerizeForm';
// import CreatepipelineForm from './CreatepipelineForm';
// import ConsoleOutputForm from './ConsoleOutputForm';
// import ProxyForm from './proxyForm';
// // import "./App.css";
// import "./modal.css";

// function App() {
//     const [framework, setframework] = useState('');
//     const [projectUrl, setProjectUrl] = useState('');
//     const [gitlabUrl, setgitlabtUrl] = useState('');
//     const [containerPort, setcontainerPort] = useState('');
//     const [deploymentEnvironment, setdeploymentEnvironment] = useState('');
//     const [jenkinsUrl, setJenkinsUrl] = useState('');
//     const [jenkinsUsername, setJenkinsUsername] = useState('');
//     const [sonarUrl, setsonarUrl] = useState('');
//     const [branchName, setBranchName] = useState('');
//     const [credentialsId, setCredentialsId] = useState('');
//     const [sitename, setSiteName] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const dockerizeFormRef = useRef();
//     const createpipelineFormRef = useRef();
//     const proxyFormRef = useRef();
//     const consoleOutputFormRef = useRef();

//     const handleStart = () => {
//         if (
//             !framework ||
//             !projectUrl ||
//             !gitlabUrl ||
//             !containerPort ||
//             !deploymentEnvironment ||
//             !jenkinsUrl ||
//             !jenkinsUsername ||
//             !sonarUrl ||
//             !branchName ||
//             !credentialsId ||
//             !sitename
//         ) {
//             setErrorMessage("Veuillez saisir toutes les valeurs.");
//             return;
//         }
//         // Assuming handleSubmit is properly defined to return a Promise
//         dockerizeFormRef.current.handleDockerizeForm(framework, projectUrl, gitlabUrl, containerPort, deploymentEnvironment)
//             .then(() => createpipelineFormRef.current.handleCreatepipelineForm(projectUrl, gitlabUrl, jenkinsUrl, jenkinsUsername, sonarUrl, branchName, credentialsId))
//             .then(() => consoleOutputFormRef.current.fetchConsoleOutput())
//             .then(() => proxyFormRef.current.handleproxyForm(sitename))
//             .then(() => setErrorMessage(''))// Fonction vide ajoutée ici
//             .catch((error) => console.error(error));
//     };

//     const handleInputChange = (e, setterFunction) => {
//         setterFunction(e.target.value);
//         if (errorMessage) {
//             setErrorMessage('');
//         }
//     };

//     return (
//         <div className="main">
//             <div>
//                 <label>
//                     Project URL:
//                     <input
//                         type="text"
//                         value={projectUrl}
//                         onChange={(e) => handleInputChange(e, setProjectUrl)}
//                     />
//                 </label>
//                 <label>
//                     gitlab URL:
//                     <input
//                         type="text"
//                         value={gitlabUrl}
//                         onChange={(e) => handleInputChange(e, setgitlabtUrl)}
//                     />
//                 </label>
//                 <label>
//                     Jenkins URL: {/* New input for Jenkins URL */}
//                     <input
//                         type="text"
//                         value={jenkinsUrl}
//                         onChange={(e) => handleInputChange(e, setJenkinsUrl)}
//                     />
//                 </label>
//                 <label>
//                     Sonar URL:
//                     <input type="text"
//                         value={sonarUrl}
//                         onChange={(e) => handleInputChange(e, setsonarUrl)} />
//                 </label>
//                 <label> {/* New label and input for Jenkins Username */}
//                     Jenkins Username:
//                     <input
//                         type="text"
//                         value={jenkinsUsername}
//                         onChange={(e) => handleInputChange(e, setJenkinsUsername)}
//                     />
//                 </label>
//                 <label>
//                     Branch Name:
//                     <input type="text" value={branchName} onChange={(e) => handleInputChange(e, setBranchName)} />
//                 </label>
//                 <label>
//                     Credentials ID:
//                     <input type="text" value={credentialsId} onChange={(e) => handleInputChange(e, setCredentialsId)} />
//                 </label>
//                 <label>
//                     Framework:
//                     <select value={framework} onChange={(e) => handleInputChange(e, setframework)}>
//                         <option value="">-- Sélectionnez un framework --</option>
//                         <option value="flask">flask</option>
//                         <option value="react">react</option>
//                         <option value="express">express</option>
//                     </select>
//                 </label>

//                 <label>
//                     Container Port:
//                     <input type="text" value={containerPort} onChange={(e) => handleInputChange(e, setcontainerPort)} />
//                 </label>

//                 <label>
//                     Deployment Environment:
//                     <input type="text" value={deploymentEnvironment} onChange={(e) => handleInputChange(e, setdeploymentEnvironment)} />
//                 </label>
//                 <label>
//                     Site Name:
//                     <input type="text" value={sitename} onChange={(e) => handleInputChange(e, setSiteName)} />
//                 </label>
//                 <button onClick={handleStart}>Start</button>
//             </div>
//             {errorMessage && <div className="error-message">{errorMessage}</div>}


//             <DockerizeForm
//                 ref={dockerizeFormRef}
//                 framework={framework}
//                 projectUrl={projectUrl}
//                 gitlabUrl={gitlabUrl}
//                 containerPort={containerPort}
//                 deploymentEnvironment={deploymentEnvironment}
//             />
//             <CreatepipelineForm
//                 ref={createpipelineFormRef}
//                 projectUrl={projectUrl}
//                 gitlabUrl={gitlabUrl}
//                 jenkinsUrl={jenkinsUrl}
//                 jenkinsUsername={jenkinsUsername}
//                 sonarUrl={sonarUrl}
//                 branchName={branchName}
//                 credentialsId={credentialsId}
//             />
//             <ProxyForm
//                 ref={proxyFormRef}
//                 sitename={sitename}
//             />
//             <ConsoleOutputForm
//                 ref={consoleOutputFormRef}
//                 projectUrl={projectUrl}
//                 gitlabUrl={gitlabUrl}
//                 jenkinsUrl={jenkinsUrl}
//                 jenkinsUsername={jenkinsUsername}
//             />
//         </div>
//     );
// }

// export default App;


import React, { useState, useRef } from 'react';
import "./Apps.css";
import ConsoleOutputForm from './ConsoleOutputForm';
import DockerizeForm from './DockerizeForm';
import CreatePipelineForm from './CreatePipelineForm';
import ProxyForm from './ProxyForm';
//import "antd/dist/antd.css"; 


function App() {
  const [projectUrl, setProjectUrl] = useState('');
  const [jenkinsUrl, setJenkinsUrl] = useState(''); // New state for Jenkins URL
  const [jenkinsUsername, setJenkinsUsername] = useState('');
  const [branchName, setBranchName] = useState('');
  const [credentialsId, setCredentialsId] = useState(''); 
  const [sonar_url, setSonarUrl] = useState('');
  const [framework, setFramework] = useState('');
  const [containerPort, setContainerPort] = useState('');
  const [deploymentEnvironment, setDeploymentEnvironment] = useState('');
  const [site_name, setSiteName] = useState('');
  


  const dockerizeFormRef = useRef();
  const createPipelineFormRef = useRef();
  const proxyFormRef = useRef();      
  const consoleOutputFormRef = useRef();


  const handleStart = () => {
    const mockEvent = { preventDefault: () => {} };
    // Assuming handleSubmit is properly defined to return a Promise
    dockerizeFormRef.current.handleSubmit(mockEvent)
      .then(() => consoleOutputFormRef.current.handleSubmit(projectUrl,jenkinsUrl,jenkinsUsername))
      .then(() => createPipelineFormRef.current.handleSubmit(mockEvent))
      
      .then(() => proxyFormRef.current.handleSubmit(mockEvent))
      .catch((error) => console.error(error));
  };


  return (
    <div>
    <div className='main'>
      
    <fieldset>
            <legend className="section-title">Main Form</legend>
      
      <label>
        Project URL:
        <input
          type="text"
          value={projectUrl}
          onChange={e => setProjectUrl(e.target.value)}
        />
      </label>
      <label>
        Jenkins URL: {/* New input for Jenkins URL */}
        <input
          type="text"
          value={jenkinsUrl}
          onChange={e => setJenkinsUrl(e.target.value)}
        />
      </label>
      <label>
          Sonar URL:
          <input type="text" value={sonar_url} onChange={e => setSonarUrl(e.target.value)} />
      </label>
      <label> {/* New label and input for Jenkins Username */}
        Jenkins Username:
        <input
          type="text"
          value={jenkinsUsername}
          onChange={e => setJenkinsUsername(e.target.value)}
        />
      </label>
      <label>
          Branch Name:
          <input type="text" value={branchName} onChange={e => setBranchName(e.target.value)} />
      </label>
      <label>
          Credentials ID:
          <input type="text" value={credentialsId} onChange={e => setCredentialsId(e.target.value)} />
      </label>
      <label>
          Framework:
          <select value={framework} onChange={(e) => setFramework(e.target.value)}>
              <option>select framework</option>
              <option value="flask">flask</option>
              <option value="react">react</option>
         </select>
      </label>

      <label>
          Container Port:
          <input type="text" value={containerPort} onChange={(e) => setContainerPort(e.target.value)} />
      </label>

      <label>
          Deployment Environment:
          <input type="text" value={deploymentEnvironment} onChange={(e) => setDeploymentEnvironment(e.target.value)} />
      </label>
      <label>
          Site Name:
          <input type="text" value={site_name} onChange={e => setSiteName(e.target.value)} />
      </label>


      <button onClick={handleStart}>Start</button>
      
      <ConsoleOutputForm ref={consoleOutputFormRef} projectUrl={projectUrl} jenkinsUrl={jenkinsUrl} jenkinsUsername={jenkinsUsername} />
      
      </fieldset>
    </div>
    <div className='main2'>
      <fieldset>
              <legend className="section-title">Progress View</legend>
      <DockerizeForm ref={dockerizeFormRef} projectUrl={projectUrl} framework={framework} containerPort={containerPort} deploymentEnvironment={deploymentEnvironment} />
      <CreatePipelineForm ref={createPipelineFormRef} projectUrl={projectUrl} jenkinsUrl={jenkinsUrl} jenkinsUsername={jenkinsUsername} sonar_url={sonar_url} branchName={branchName} credentialsId={credentialsId}/>
      <ProxyForm ref={proxyFormRef} site_name={site_name}  />
      </fieldset>
      </div>
    </div>
  );
}

export default App;







