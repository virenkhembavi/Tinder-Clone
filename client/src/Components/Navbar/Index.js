import React from 'react'
import logo from '../../images/Tinder-removebg-preview.png'

export default function Index({ setShowModal, showModal, setIsSignUp }) {
    // authToken
    const handleClck = () => {
        setShowModal(true)
        setIsSignUp(false)
    }
    const authToken = false;
    return (
        <nav authToken>
            <div className='logo-container'>
                <img className='logo' src={logo} alt="logo" />
            </div>
            {!authToken && <button className='nav-button' onClick={handleClck} disabled={showModal}>Login</button>}
        </nav>
    )
}
