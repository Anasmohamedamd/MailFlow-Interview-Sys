import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("username");

    if (!token) {
      // Not logged in → redirect to login
      navigate("/auth");
    } else {
      // Set username from localStorage
      setUsername(name || "User");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/auth");
  };

  return (
    <div className='container mt-5'>
        <div className='d-flex justify-content-between align-items-center'>
            <h2>DashBoard</h2>
            <button className='btn btn-danger' onClick={() => handleLogout()}>LogOut</button>
        </div>

        <p className='text-center'>Welcome <strong>{username}</strong></p>
        <div className='row mt-4'>
            <div className='col-md-4 mb-3'>
                <div className='card text-center shadow-sm'>
                    <div className='card-body'>
                        <h5 className='card-title'>Campaigns</h5>
                        <p className='card-text'>Create and manage your email campaigns</p>
                        <button className='btn btn-primary w-100' onClick={() => navigate('/campaign')}>Go</button>
                    </div>
                </div>
            </div>
            <div className='col-md-4 mb-3'>
                <div className='card text-center shadow-sm'>
                    <div className='card-body'>
                        <h5 className='card-title'>Contacts</h5>
                        <p className='card-text'>Manage your contact list easily</p>
                        <button className='btn btn-primary w-100' onClick={() => navigate('/contact')}>Go</button>
                    </div>
                </div>
            </div>
            <div className='col-md-4 mb-3'>
                <div className='card text-center shadow-sm'>
                    <div className='card-body'>
                        <h5 className='card-title'>Analytics</h5>
                        <p className='card-text'>Track opens, clicks, and performance</p>
                        <button className='btn btn-primary w-100'>Go</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashBoard