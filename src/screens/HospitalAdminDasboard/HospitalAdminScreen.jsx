import React from 'react'
import { Navbar } from '../../utils/NavBar'
import SideBar from '../../utils/Sidebar'
import { Link } from 'react-router-dom'
import { FaUsers } from "react-icons/fa";
function HospitalAdminScreen() {
    return (
        <>
            <Navbar />
            <SideBar />
            <div
                className=""
                style={{
                    position: "relative",
                    top: "4.5rem",
                    marginLeft: "7%",
                    width: "90%",
                }}
            >
                <div style={{ display: 'flex', gap: '2vw' }}>
                    <Link to='/hospitalAdminUser' style={{textDecoration:'none'}}>
                        <div style={{boxShadow:'rgba(0, 0, 0, 0.16) 0px 0px 50px', backgroundColor: 'white', color: 'black', display: 'flex',justifyContent:'center',alignItems:'center',gap:'1vw', width: '18vw', height: '8vw', textAlign: 'center', borderRadius: '15px' }}>
                            <FaUsers size={60} />
                            <h5 style={{fontSize:'20px'}}>User</h5>
                        </div>
                    </Link>
                    <Link to='/home'  style={{textDecoration:'none'}}>
                        <div style={{ boxShadow:'rgba(0, 0, 0, 0.16) 0px 0px 50px',backgroundColor: 'white', color: 'black', display: 'flex',justifyContent:'center',alignItems:'center',gap:'1vw', width: '18vw', height: '8vw', textAlign: 'center', borderRadius: '15px' }}>
                            <h5 style={{fontSize:'20px'}}>Devices</h5>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default HospitalAdminScreen