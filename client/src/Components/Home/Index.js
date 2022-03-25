import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Index'
import Authmodel from '../Authmodel/Authmodel';

export default function Index() {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);
    const authToken = false;

    const handleClick = () => {
        console.log('Clicked')
        setShowModal(true);
        setIsSignUp(true)
    }


    return (
        <div className='overlay'>
            <Navbar
                // authToken={authToken}
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignUp={setIsSignUp} />
            <div className='home'>
                <h1 className='primary-title'>Swipe Right</h1>
                <button className='primary-button' onClick={handleClick}>{authToken ? "Sign out" : "Create Account"}</button>
                {showModal && (
                    <Authmodel setShowModal={setShowModal} isSignUp={isSignUp} />
                )}
            </div>
        </div>
    )
}
