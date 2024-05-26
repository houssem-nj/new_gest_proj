// import React, { useState, useEffect, useRef } from "react";
// import { SearchOutlined, BellOutlined } from "@ant-design/icons";
// import { Badge, Button, Input, Space, Table, Modal, Checkbox, message, notification } from "antd";
// import Highlighter from "react-highlight-words";
// import { useLocation } from "react-router-dom"; // Assurez-vous d'avoir installé react-router-dom
// import axios from "axios";
// import "./../App.css";
// import "./modal.css";

// function Moa_test() {
//     const [details_approuvees, setDetailsApprouvees] = useState([]);
//     const [searchText, setSearchText] = useState("");
//     const [searchedColumn, setSearchedColumn] = useState("");
//     const searchInput = useRef(null);
//     const [modalData, setModalData] = useState({});
//     const [isModalOpen, setIsModalOpen] = useState(false); // état pour gérer l'ouverture/fermeture
//     const [isChecked, setIsChecked] = useState(false);
//     const [notifData, setNotifData] = useState([]);
//     const [isNotifVisible, setIsNotifVisible] = useState(false);
//     const [unreadCount, setUnreadCount] = useState(0);
//     const [refusalReason, setRefusalReason] = useState(""); // Pour stocker le motif de refus
//     const [isRefusalInputVisible, setIsRefusalInputVisible] = useState(false); // Pour afficher le champ de saisie du motif de refus

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 const response = await axios.post("http://localhost:5002/gest_notif");
//                 if (response.data && response.data.length > 0) {
//                     // Trier les notifications par date décroissante
//                     const sortedNotifData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
//                     setNotifData(sortedNotifData);
//                     updateUnreadCount(sortedNotifData);
//                 }
//             } catch (error) {
//                 console.error("Erreur lors de la récupération des notifications:", error);
//             }
//         };

//         fetchNotifications();
//     }, []);

//     const updateUnreadCount = (notifications) => {
//         const lastReadDateTime = localStorage.getItem("lastReadDateTime");
//         let newUnreadCount = 0;

//         if (lastReadDateTime) {
//             newUnreadCount = notifications.filter(notif => new Date(notif.date) > new Date(lastReadDateTime)).length;
//         } else {
//             newUnreadCount = notifications.length;
//         }

//         setUnreadCount(newUnreadCount);
//     };

//     const toggleNotifDiv = () => {
//         setIsNotifVisible(!isNotifVisible);
//         if (!isNotifVisible && notifData.length > 0) {
//             // Marquer toutes les notifications comme lues en stockant la date et l'heure de la dernière notification
//             const latestNotifDateTime = notifData[0].date; // Assurez-vous que notifData est trié par date décroissante
//             localStorage.setItem("lastReadDateTime", latestNotifDateTime);
//             setUnreadCount(0);
//         }
//     };

//     const handleFinish = async (isApproved) => {
//         // Obtenir la date et l'heure actuelles
//         const now = new Date();
//         const formattedDateTime = now.toISOString().replace('T', ' ').substring(0, 19);

//         const messageToSend = {
//             date: formattedDateTime,
//             message: isApproved
//                 ? `Test verifié, déploiement terminé pour ID Projet: ${modalData.project_id}, URL Projet: ${modalData.url_project}, Nom projet: ${modalData.nom_projet}`
//                 : `Test non reuissie, déploiement refusé pour le projet, Nom projet: ${modalData.nom_projet}, ID Projet: ${modalData.project_id}. Motif du refus: ${refusalReason}`,
//         };

//         // Préparer le JSON à envoyer à l'endpoint etat_suivi
//         const etatSuiviData = {
//             project_id: modalData.project_id,
//             project_name: modalData.nom_projet,
//             initialisation: "demande initialisée",
//             retour_deploiement: "approuved",
//             fin_de_test: isApproved ? "test effectué, succès" : `refused: ${refusalReason}`
//         };

//         try {
//             const response = await axios.post('http://localhost:5002/gest_notif', messageToSend, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             // Envoyer les données à l'endpoint etat_suivi
//             const responseEtatSuivi = await axios.post('http://localhost:5002/etat_suivi', etatSuiviData, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             console.log("Réponse de l'endpoint:", response.data);
//             console.log("Réponse de l'endpoint etat_suivi:", responseEtatSuivi.data);

//             if (isApproved) {
//                 setIsModalOpen(false); // Fermer le modal si approuvé
//             } else {
//                 setRefusalReason(""); // Réinitialiser le motif de refus
//                 setIsRefusalInputVisible(false); // Cacher le champ de saisie du motif de refus
//             }
//         } catch (error) {
//             console.error("Erreur lors de l'envoi des données:", error);
//         }
//     };

//     const handleRefuseClick = () => {
//         setIsRefusalInputVisible(true); // Afficher le champ de saisie du motif de refus
//     };

//     const showDetails = async (id) => {
//         console.log("ID demandé:", id);
//         try {
//             const response = await axios.get(`http://localhost:5002/get_details_MOA/${id}`);
//             setModalData(response.data);
//             setIsModalOpen(true); // Ouvrir le modal
//         } catch (error) {
//             console.error("Erreur lors de la récupération des détails:", error);
//         }
//     };

//     const closeModal = () => {
//         setIsModalOpen(false); // Fermer le modal
//     };

//     const handleCheck = (e) => {
//         setIsChecked(e.target.checked);
//     };

//     const handleSearch = (selectedKeys, confirm, dataIndex) => {
//         confirm();
//         setSearchText(selectedKeys[0]);
//         setSearchedColumn(dataIndex);
//     };
//     const handleReset = (clearFilters) => {
//         clearFilters();
//         setSearchText("");
//     };
//     const getColumnSearchProps = (dataIndex) => ({
//         filterDropdown: ({
//             setSelectedKeys,
//             selectedKeys,
//             confirm,
//             clearFilters,
//             close,
//         }) => (
//             <div
//                 style={{
//                     padding: 8,
//                 }}
//                 onKeyDown={(e) => e.stopPropagation()}
//             >
//                 <Input
//                     ref={searchInput}
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={(e) =>
//                         setSelectedKeys(e.target.value ? [e.target.value] : [])
//                     }
//                     onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                     style={{
//                         marginBottom: 8,
//                         display: "block",
//                     }}
//                 />
//                 <Space>
//                     <Button
//                         type="primary"
//                         onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                         icon={<SearchOutlined />}
//                         size="small"
//                         style={{
//                             width: 90,
//                         }}
//                     >
//                         Search
//                     </Button>
//                     <Button
//                         onClick={() => clearFilters && handleReset(clearFilters)}
//                         size="small"
//                         style={{
//                             width: 90,
//                         }}
//                     >
//                         Reset
//                     </Button>
//                     <Button
//                         type="link"
//                         size="small"
//                         onClick={() => {
//                             confirm({
//                                 closeDropdown: false,
//                             });
//                             setSearchText(selectedKeys[0]);
//                             setSearchedColumn(dataIndex);
//                         }}
//                     >
//                         Filter
//                     </Button>
//                     <Button
//                         type="link"
//                         size="small"
//                         onClick={() => {
//                             close();
//                         }}
//                     >
//                         close
//                     </Button>
//                 </Space>
//             </div>
//         ),
//         filterIcon: (filtered) => (
//             <SearchOutlined
//                 style={{
//                     color: filtered ? "#1677ff" : undefined,
//                 }}
//             />
//         ),
//         onFilter: (value, record) =>
//             record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//         onFilterDropdownOpenChange: (visible) => {
//             if (visible) {
//                 setTimeout(() => searchInput.current?.select(), 100);
//             }
//         },
//         render: (text) =>
//             searchedColumn === dataIndex ? (
//                 <Highlighter
//                     highlightStyle={{
//                         backgroundColor: "#ffc069",
//                         padding: 0,
//                     }}
//                     searchWords={[searchText]}
//                     autoEscape
//                     textToHighlight={text ? text.toString() : ""}
//                 />
//             ) : (
//                 text
//             ),
//     });

//     useEffect(() => {
//         axios.get("http://localhost:5002/check_MOA")
//             .then((response) => {
//                 console.log("Les demandes approuvées:", response.data);
//                 setDetailsApprouvees(response.data); // Met à jour l'état avec les données reçues
//             })
//             .catch((error) => {
//                 console.error("Erreur lors de la récupération des détails:", error);
//             });
//     }, []);

//     const columns = [
//         {
//             title: "Date de demande",
//             dataIndex: "Date de demande",
//             key: "Date de demande",
//             render: (text) => <p>{new Date(text).toLocaleString()}</p>,
//         },
//         {
//             title: "ID Demande",
//             dataIndex: "_id",
//             key: "_id",
//         },
//         {
//             title: "Chef Projet",
//             dataIndex: "Chef de projet",
//             key: "chef",
//             ...getColumnSearchProps("Chef de projet"),
//         },
//         {
//             title: "Etat",
//             dataIndex: "etat",
//         },
//         {
//             title: 'Action',
//             key: 'action',
//             render: (_, record) => (
//                 <Button onClick={() => showDetails(record._id)}>Détails</Button>
//             ),
//         },

//     ];

//     // console.log(details_approuvees);
//     return (
//         <div>
//             <h2>Réponses des demandes approuvées</h2>
//             <div style={{ position: 'absolute', top: '35px', right: '40px' }}>
//                 <Badge count={unreadCount}>
//                     <BellOutlined onClick={toggleNotifDiv} className="bell-icon-hover" />

//                 </Badge>
//             </div>
//             {isNotifVisible && (
//                 <div className="notification-div">
//                     {notifData.map((notif, index) => (
//                         <div key={index} className="notification-item">
//                             <p><strong>Notification {index + 1}</strong></p>
//                             <p>{notif.date} <br /> {notif.message}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//             <Table columns={columns} dataSource={details_approuvees} />
//             <Modal
//                 title="Détails de la demande"
//                 open={isModalOpen}
//                 onCancel={closeModal}
//                 footer={[
//                     <Checkbox key="check" onChange={handleCheck} checked={isChecked}>
//                         Vérifié
//                     </Checkbox>,
//                     <Button key="finish" onClick={() => handleFinish(true)} disabled={!isChecked}>
//                         Terminé
//                     </Button>,
//                     <Button key="refuse" onClick={handleRefuseClick} disabled={isChecked}>
//                         Refuser
//                     </Button>,
//                 ]}
//             >
//                 {isRefusalInputVisible && (
//                     <div>
//                         <Input
//                             type="text"
//                             value={refusalReason}
//                             onChange={(e) => setRefusalReason(e.target.value)}
//                             placeholder="Motif du refus"
//                         />
//                         <Button
//                             onClick={() => handleFinish(false)}
//                             disabled={!refusalReason}
//                         >
//                             Envoyer
//                         </Button>
//                     </div>
//                 )}
//                 <div>
//                     <p><strong>ID Projet :</strong> {modalData.project_id}</p>
//                     <p><strong>URL Projet :</strong> {modalData.url_project}</p>
//                     <p><strong>Nom projet :</strong> {modalData.nom_projet}</p>
//                 </div>
//             </Modal>
//         </div>
//     );
// }

// export default Moa_test;


import React, { useState, useEffect, useRef } from "react";
import { SearchOutlined, BellOutlined } from "@ant-design/icons";
import { Badge, Button, Input, Space, Table, Modal, Checkbox, message, notification } from "antd";
import Highlighter from "react-highlight-words";
import axios from "axios";
import "./../App.css";
import "./modal.css";

function Moa_test() {
    const [details_approuvees, setDetailsApprouvees] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [modalData, setModalData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); // état pour gérer l'ouverture/fermeture
    const [isChecked, setIsChecked] = useState(false);
    const [notifData, setNotifData] = useState([]);
    const [isNotifVisible, setIsNotifVisible] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [refusalReason, setRefusalReason] = useState(""); // Pour stocker le motif de refus
    const [isRefusalInputVisible, setIsRefusalInputVisible] = useState(false); // Pour afficher le champ de saisie du motif de refus
    const [selectedRequestId, setSelectedRequestId] = useState(null); // Pour stocker l'ID de la demande sélectionnée

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.post("http://109.205.176.62:7010/gest_notif");
                if (response.data && response.data.length > 0) {
                    // Trier les notifications par date décroissante
                    const sortedNotifData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setNotifData(sortedNotifData);
                    updateUnreadCount(sortedNotifData);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    const updateUnreadCount = (notifications) => {
        const lastReadDateTime = localStorage.getItem("lastReadDateTime");
        let newUnreadCount = 0;

        if (lastReadDateTime) {
            newUnreadCount = notifications.filter(notif => new Date(notif.date) > new Date(lastReadDateTime)).length;
        } else {
            newUnreadCount = notifications.length;
        }

        setUnreadCount(newUnreadCount);
    };

    const toggleNotifDiv = () => {
        setIsNotifVisible(!isNotifVisible);
        if (!isNotifVisible && notifData.length > 0) {
            // Marquer toutes les notifications comme lues en stockant la date et l'heure de la dernière notification
            const latestNotifDateTime = notifData[0].date; // Assurez-vous que notifData est trié par date décroissante
            localStorage.setItem("lastReadDateTime", latestNotifDateTime);
            setUnreadCount(0);
        }
    };

    const handleFinish = async (isApproved) => {
        // Obtenir la date et l'heure actuelles
        const now = new Date();
        const formattedDateTime = now.toISOString().replace('T', ' ').substring(0, 19);

        const messageToSend = {
            date: formattedDateTime,
            message: isApproved
                ? `Test verifié, déploiement terminé pour ID Projet: ${modalData.project_id}, URL Projet: ${modalData.url_project}, Nom projet: ${modalData.nom_projet}`
                : `Test non reuissie, déploiement refusé pour le projet, Nom projet: ${modalData.nom_projet}, ID Projet: ${modalData.project_id}. Motif du refus: ${refusalReason}`,
        };

        // Préparer le JSON à envoyer à l'endpoint etat_suivi
        const etatSuiviData = {
            project_id: modalData.project_id,
            project_name: modalData.nom_projet,
            initialisation: "demande initialisée",
            retour_deploiement: "approuved",
            fin_de_test: isApproved ? "test effectué, succès" : `refused: ${refusalReason}`
        };

        try {
            const response = await axios.post('http://109.205.176.62:7010/gest_notif', messageToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Envoyer les données à l'endpoint etat_suivi
            const responseEtatSuivi = await axios.post('http://109.205.176.62:7010/etat_suivi', etatSuiviData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Réponse de l'endpoint:", response.data);
            console.log("Réponse de l'endpoint etat_suivi:", responseEtatSuivi.data);

            if (!isApproved && refusalReason !== "") {
                await axios.post("http://109.205.176.62:7010/stocker", {
                    _id: selectedRequestId,
                    message: "Demande refusée: " + refusalReason,
                });
            }

            if (isApproved) {
                // Envoyer la requête DELETE à l'endpoint retirer
                await axios.delete(`http:///retirer/${selectedRequestId}`);
                setIsModalOpen(false); // Fermer le modal si approuvé
            } else {
                setRefusalReason(""); // Réinitialiser le motif de refus
                setIsRefusalInputVisible(false); // Cacher le champ de saisie du motif de refus
                await axios.delete(`http://109.205.176.62:7010/retirer/${selectedRequestId}`);
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi des données:", error);
        }
    };

    const handleRefuseClick = () => {
        setIsRefusalInputVisible(true); // Afficher le champ de saisie du motif de refus
    };

    const showDetails = async (id) => {
        console.log("ID demandé:", id);
        try {
            const response = await axios.get(`http://109.205.176.62:7010/get_details_MOA/${id}`);
            setModalData(response.data);
            setSelectedRequestId(id); // Stocker l'ID de la demande sélectionnée
            setIsModalOpen(true); // Ouvrir le modal
        } catch (error) {
            console.error("Erreur lors de la récupération des détails:", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false); // Fermer le modal
    };

    const handleCheck = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    useEffect(() => {
        axios.get("http://109.205.176.62:7010/check_MOA")
            .then((response) => {
                console.log("Les demandes approuvées:", response.data);
                setDetailsApprouvees(response.data); // Met à jour l'état avec les données reçues
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des détails:", error);
            });
    }, []);

    const columns = [
        {
            title: "Date de demande",
            dataIndex: "Date de demande",
            key: "Date de demande",
            render: (text) => <p>{new Date(text).toLocaleString()}</p>,
        },
        {
            title: "ID Demande",
            dataIndex: "_id",
            key: "_id",
        },
        {
            title: "Chef Projet",
            dataIndex: "Chef de projet",
            key: "chef",
            ...getColumnSearchProps("Chef de projet"),
        },
        {
            title: "Etat",
            dataIndex: "etat",
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button onClick={() => showDetails(record._id)}>Détails</Button>
            ),
        },
    ];

    return (
        <div>
            <h1>Réponses des demandes approuvées</h1>
            <div style={{ position: 'absolute', top: '35px', right: '40px' }}>
                <Badge count={unreadCount}>
                    <BellOutlined onClick={toggleNotifDiv} className="bell-icon-hover" />
                </Badge>
            </div>
            {isNotifVisible && (
                <div className="notification-div">
                    {notifData.map((notif, index) => (
                        <div key={index} className="notification-item">
                            <p><strong>Notification {index + 1}</strong></p>
                            <p>{notif.date} <br /> {notif.message}</p>
                        </div>
                    ))}
                </div>
            )}
            <Table columns={columns} dataSource={details_approuvees} />
            <Modal
                title="Détails de la demande"
                open={isModalOpen}
                onCancel={closeModal}
                footer={[
                    <Checkbox key="check" onChange={handleCheck} checked={isChecked}>
                        Vérifié
                    </Checkbox>,
                    <Button key="finish" onClick={() => handleFinish(true)} disabled={!isChecked}>
                        Terminé
                    </Button>,
                    <Button key="refuse" onClick={handleRefuseClick} disabled={isChecked}>
                        Refuser
                    </Button>,
                ]}
            >
                {isRefusalInputVisible && (
                    <div>
                        <Input
                            type="text"
                            value={refusalReason}
                            onChange={(e) => setRefusalReason(e.target.value)}
                            placeholder="Motif du refus"
                        />
                        <Button
                            onClick={() => handleFinish(true)}
                            disabled={!refusalReason}
                        >
                            Envoyer
                        </Button>
                    </div>
                )}
                <div>
                    <p><strong>ID Projet :</strong> {modalData.project_id}</p>
                    <p><strong>URL Projet :</strong> {modalData.url_project}</p>
                    <p><strong>Nom projet :</strong> {modalData.nom_projet}</p>
                    <Checkbox key="check" onChange={handleCheck} checked={isChecked}>
                        je jure sur l'honneur que j'ai effectué les tests nécessaires
                    </Checkbox>
                </div>
            </Modal>
        </div>
    );
}

export default Moa_test;



// import React, { useState, useEffect, useRef } from "react";
// import { SearchOutlined, BellOutlined } from "@ant-design/icons";
// import { Badge, Button, Input, Space, Table, Modal, Checkbox, message, notification } from "antd";
// import Highlighter from "react-highlight-words";
// import axios from "axios";
// import "./../App.css";
// import "./modal.css";

// function Moa_test() {
//     const [details_approuvees, setDetailsApprouvees] = useState([]);
//     const [searchText, setSearchText] = useState("");
//     const [searchedColumn, setSearchedColumn] = useState("");
//     const searchInput = useRef(null);
//     const [modalData, setModalData] = useState({});
//     const [isModalOpen, setIsModalOpen] = useState(false); // état pour gérer l'ouverture/fermeture
//     const [isChecked, setIsChecked] = useState(false);
//     const [notifData, setNotifData] = useState([]);
//     const [isNotifVisible, setIsNotifVisible] = useState(false);
//     const [unreadCount, setUnreadCount] = useState(0);
//     const [refusalReason, setRefusalReason] = useState(""); // Pour stocker le motif de refus
//     const [isRefusalInputVisible, setIsRefusalInputVisible] = useState(false); // Pour afficher le champ de saisie du motif de refus
//     const [selectedRequestId, setSelectedRequestId] = useState(null); // Pour stocker l'ID de la demande sélectionnée

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 const response = await axios.post("http://localhost:5002/gest_notif");
//                 if (response.data && response.data.length > 0) {
//                     // Trier les notifications par date décroissante
//                     const sortedNotifData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
//                     setNotifData(sortedNotifData);
//                     updateUnreadCount(sortedNotifData);
//                 }
//             } catch (error) {
//                 console.error("Erreur lors de la récupération des notifications:", error);
//             }
//         };

//         fetchNotifications();
//     }, []);

//     const updateUnreadCount = (notifications) => {
//         const lastReadDateTime = localStorage.getItem("lastReadDateTime");
//         let newUnreadCount = 0;

//         if (lastReadDateTime) {
//             newUnreadCount = notifications.filter(notif => new Date(notif.date) > new Date(lastReadDateTime)).length;
//         } else {
//             newUnreadCount = notifications.length;
//         }

//         setUnreadCount(newUnreadCount);
//     };

//     const toggleNotifDiv = () => {
//         setIsNotifVisible(!isNotifVisible);
//         if (!isNotifVisible && notifData.length > 0) {
//             // Marquer toutes les notifications comme lues en stockant la date et l'heure de la dernière notification
//             const latestNotifDateTime = notifData[0].date; // Assurez-vous que notifData est trié par date décroissante
//             localStorage.setItem("lastReadDateTime", latestNotifDateTime);
//             setUnreadCount(0);
//         }
//     };

//     const handleFinish = async (isApproved) => {
//         // Obtenir la date et l'heure actuelles
//         const now = new Date();
//         const formattedDateTime = now.toISOString().replace('T', ' ').substring(0, 19);

//         const messageToSend = {
//             date: formattedDateTime,
//             message: isApproved
//                 ? `Test verifié, déploiement terminé pour ID Projet: ${modalData.project_id}, URL Projet: ${modalData.url_project}, Nom projet: ${modalData.nom_projet}`
//                 : `Test non reuissie, déploiement refusé pour le projet, Nom projet: ${modalData.nom_projet}, ID Projet: ${modalData.project_id}. Motif du refus: ${refusalReason}`,
//         };

//         // Préparer le JSON à envoyer à l'endpoint etat_suivi
//         const etatSuiviData = {
//             project_id: modalData.project_id,
//             project_name: modalData.nom_projet,
//             initialisation: "demande initialisée",
//             retour_deploiement: "approuved",
//             fin_de_test: isApproved ? "test effectué, succès" : `refused: ${refusalReason}`
//         };

//         try {
//             const response = await axios.post('http://localhost:5002/gest_notif', messageToSend, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             // Envoyer les données à l'endpoint etat_suivi
//             const responseEtatSuivi = await axios.post('http://localhost:5002/etat_suivi', etatSuiviData, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             console.log("Réponse de l'endpoint:", response.data);
//             console.log("Réponse de l'endpoint etat_suivi:", responseEtatSuivi.data);

//             if (!isApproved && refusalReason !== "") {
//                 await axios.post("http://localhost:5002/stocker", {
//                     _id: selectedRequestId,
//                     message: "Demande refusée: " + refusalReason,
//                 });
//             }

//             if (isApproved) {
//                 setIsModalOpen(false); // Fermer le modal si approuvé
//             } else {
//                 setRefusalReason(""); // Réinitialiser le motif de refus
//                 setIsRefusalInputVisible(false); // Cacher le champ de saisie du motif de refus
//             }
//         } catch (error) {
//             console.error("Erreur lors de l'envoi des données:", error);
//         }
//     };

//     const handleRefuseClick = () => {
//         setIsRefusalInputVisible(true); // Afficher le champ de saisie du motif de refus
//     };

//     const showDetails = async (id) => {
//         console.log("ID demandé:", id);
//         try {
//             const response = await axios.get(`http://localhost:5002/get_details_MOA/${id}`);
//             setModalData(response.data);
//             setSelectedRequestId(id); // Stocker l'ID de la demande sélectionnée
//             setIsModalOpen(true); // Ouvrir le modal
//         } catch (error) {
//             console.error("Erreur lors de la récupération des détails:", error);
//         }
//     };

//     const closeModal = () => {
//         setIsModalOpen(false); // Fermer le modal
//     };

//     const handleCheck = (e) => {
//         setIsChecked(e.target.checked);
//     };

//     const handleSearch = (selectedKeys, confirm, dataIndex) => {
//         confirm();
//         setSearchText(selectedKeys[0]);
//         setSearchedColumn(dataIndex);
//     };
//     const handleReset = (clearFilters) => {
//         clearFilters();
//         setSearchText("");
//     };
//     const getColumnSearchProps = (dataIndex) => ({
//         filterDropdown: ({
//             setSelectedKeys,
//             selectedKeys,
//             confirm,
//             clearFilters,
//             close,
//         }) => (
//             <div
//                 style={{
//                     padding: 8,
//                 }}
//                 onKeyDown={(e) => e.stopPropagation()}
//             >
//                 <Input
//                     ref={searchInput}
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={(e) =>
//                         setSelectedKeys(e.target.value ? [e.target.value] : [])
//                     }
//                     onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                     style={{
//                         marginBottom: 8,
//                         display: "block",
//                     }}
//                 />
//                 <Space>
//                     <Button
//                         type="primary"
//                         onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                         icon={<SearchOutlined />}
//                         size="small"
//                         style={{
//                             width: 90,
//                         }}
//                     >
//                         Search
//                     </Button>
//                     <Button
//                         onClick={() => clearFilters && handleReset(clearFilters)}
//                         size="small"
//                         style={{
//                             width: 90,
//                         }}
//                     >
//                         Reset
//                     </Button>
//                     <Button
//                         type="link"
//                         size="small"
//                         onClick={() => {
//                             confirm({
//                                 closeDropdown: false,
//                             });
//                             setSearchText(selectedKeys[0]);
//                             setSearchedColumn(dataIndex);
//                         }}
//                     >
//                         Filter
//                     </Button>
//                     <Button
//                         type="link"
//                         size="small"
//                         onClick={() => {
//                             close();
//                         }}
//                     >
//                         close
//                     </Button>
//                 </Space>
//             </div>
//         ),
//         filterIcon: (filtered) => (
//             <SearchOutlined
//                 style={{
//                     color: filtered ? "#1677ff" : undefined,
//                 }}
//             />
//         ),
//         onFilter: (value, record) =>
//             record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//         onFilterDropdownOpenChange: (visible) => {
//             if (visible) {
//                 setTimeout(() => searchInput.current?.select(), 100);
//             }
//         },
//         render: (text) =>
//             searchedColumn === dataIndex ? (
//                 <Highlighter
//                     highlightStyle={{
//                         backgroundColor: "#ffc069",
//                         padding: 0,
//                     }}
//                     searchWords={[searchText]}
//                     autoEscape
//                     textToHighlight={text ? text.toString() : ""}
//                 />
//             ) : (
//                 text
//             ),
//     });

//     useEffect(() => {
//         axios.get("http://localhost:5002/check_MOA")
//             .then((response) => {
//                 console.log("Les demandes approuvées:", response.data);
//                 setDetailsApprouvees(response.data); // Met à jour l'état avec les données reçues
//             })
//             .catch((error) => {
//                 console.error("Erreur lors de la récupération des détails:", error);
//             });
//     }, []);

//     const columns = [
//         {
//             title: "Date de demande",
//             dataIndex: "Date de demande",
//             key: "Date de demande",
//             render: (text) => <p>{new Date(text).toLocaleString()}</p>,
//         },
//         {
//             title: "ID Demande",
//             dataIndex: "_id",
//             key: "_id",
//         },
//         {
//             title: "Chef Projet",
//             dataIndex: "Chef de projet",
//             key: "chef",
//             ...getColumnSearchProps("Chef de projet"),
//         },
//         {
//             title: "Etat",
//             dataIndex: "etat",
//         },
//         {
//             title: 'Action',
//             key: 'action',
//             render: (_, record) => (
//                 <Button onClick={() => showDetails(record._id)}>Détails</Button>
//             ),
//         },
//     ];

//     return (
//         <div>
//             <h1>Réponses des demandes approuvées</h1>
//             <div style={{ position: 'absolute', top: '35px', right: '40px' }}>
//                 <Badge count={unreadCount}>
//                     <BellOutlined onClick={toggleNotifDiv} className="bell-icon-hover" />
//                 </Badge>
//             </div>
//             {isNotifVisible && (
//                 <div className="notification-div">
//                     {notifData.map((notif, index) => (
//                         <div key={index} className="notification-item">
//                             <p><strong>Notification {index + 1}</strong></p>
//                             <p>{notif.date} <br /> {notif.message}</p>
//                         </div>
//                     ))}

//                 </div>
//             )}
//             <Table columns={columns} dataSource={details_approuvees} />
//             <Modal
//                 title="Détails de la demande"
//                 open={isModalOpen}
//                 onCancel={closeModal}
//                 footer={[

//                     <Button key="finish" onClick={() => handleFinish(true)} disabled={!isChecked}>
//                         Terminé
//                     </Button>,
//                     <Button key="refuse" onClick={handleRefuseClick} disabled={isChecked}>
//                         Refuser
//                     </Button>,
//                 ]}
//             >
//                 {isRefusalInputVisible && (
//                     <div>
//                         <Input
//                             type="text"
//                             value={refusalReason}
//                             onChange={(e) => setRefusalReason(e.target.value)}
//                             placeholder="Motif du refus"
//                         />
//                         <Button
//                             onClick={() => handleFinish(true)}
//                             disabled={!refusalReason}
//                         >
//                             Envoyer
//                         </Button>
//                     </div>
//                 )}
//                 <div>
//                     <p><strong>ID Projet :</strong> {modalData.project_id}</p>
//                     <p><strong>URL Projet :</strong> {modalData.url_project}</p>
//                     <p><strong>Nom projet :</strong> {modalData.nom_projet}</p>
//                     <Checkbox key="check" onChange={handleCheck} checked={isChecked}>
//                         je jure sur l'honneur que j'ai effectué les tests nécessaires
//                     </Checkbox>
//                 </div>
//             </Modal>
//         </div>
//     );
// }

// export default Moa_test;
