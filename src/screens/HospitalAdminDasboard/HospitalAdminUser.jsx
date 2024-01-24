import React, { useState } from 'react'
import { Navbar } from '../../utils/NavBar'
import SideBar from '../../utils/Sidebar'
import { Link } from 'react-router-dom'
import ActiveUsers from './StatusOfUsres/ActiveUsers'
import PendingUsrs from './StatusOfUsres/PendingUsrs'
import AllUseres from './StatusOfUsres/AllUseres'
import NavBarForAll from '../../utils/NavBarForAll'

function HospitalAdminUser() {

    const [activeTab, setActiveTab] = useState(0);
    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    return (
        <>
             <NavBarForAll />
            <div
                className=""
                style={{
                    position: "relative",
                    top: "6rem",
                    marginLeft: "2%",
                    width: "90%",
                }}
            >
                <div style={{ display: 'flex', gap: '2vw' }}>
                    <button onClick={() => handleTabClick(0)}>
                        <div style={activeTab === 0 ?
                            { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'rgb(203, 41, 123)', color: 'white', display: 'flex', justifyContent:'center',alignItems:'center',width: '10vw', height: '5vw', textAlign: 'center', borderRadius: '15px' } :
                            { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'white', color: 'black', display: 'flex', justifyContent:'center',alignItems:'center',width: '10vw', height: '5vw', textAlign: 'center', borderRadius: '15px' }}
                        >
                            <h5 style={{fontSize: '15px' }}>Active User's</h5>
                        </div>
                    </button>
                    <button onClick={() => handleTabClick(1)}>

                        <div style={activeTab === 1 ?
                            { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'rgb(203, 41, 123)', color: 'white', display: 'flex', justifyContent:'center',alignItems:'center',width: '10vw', height: '5vw', textAlign: 'center', borderRadius: '15px' } :

                            { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'white', color: 'black', display: 'flex', justifyContent:'center',alignItems:'center',width: '10vw', height: '5vw', textAlign: 'center', borderRadius: '15px' }
                        }>
                            <h5 style={{fontSize: '15px' }}>Pending User's</h5>
                        </div>
                    </button>
                    <button onClick={() => handleTabClick(2)}>

                        <div style={activeTab === 2 ?
                            { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'rgb(203, 41, 123)', color: 'white', display: 'flex', justifyContent:'center',alignItems:'center',width: '10vw', height: '5vw', textAlign: 'center', borderRadius: '15px' } :

                            { boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'white', color: 'black', display: 'flex', justifyContent:'center',alignItems:'center',width: '10vw', height: '5vw', textAlign: 'center', borderRadius: '15px' }
                        }>
                            <h5 style={{fontSize: '15px' }}>Permission</h5>
                        </div>
                    </button>
                </div>
                <div style={{ marginTop: '3vw' }}>
                    {activeTab === 0 && <ActiveUsers />}
                    {activeTab === 1 && <PendingUsrs />}
                    {activeTab === 2 && <AllUseres />}
                </div>
            </div>
        </>
    )
}

export default HospitalAdminUser