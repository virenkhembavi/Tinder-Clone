import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'


export default function Authmodel({ setShowModal, isSignUp }) {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);
    const [cookie, setCookie, removeCookie] = useCookies(['user'])

    let navigate = useNavigate();


    const handleClick = () => {
        setShowModal(false);
    }

    // const isSignUp = true;


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError('password needs to match')
            }
            // console.log('make a get request from database')
            const response = await axios.post(`http://localhost:8080/${isSignUp ? 'signup' : 'login'}`, { email, password })

            const sucess = response.status === 201

            // setCookie('Email', response.data.email)
            setCookie('UserId', response.data.userId)
            setCookie('AuthToken', response.data.token)

            if (sucess && isSignUp) navigate("/onboard")
            if (sucess && !isSignUp) navigate("/dashboard")
            window.location.reload()

        } catch (error) {
            console.log("error")
        }
    }


    return (
        <div className='auth-modal'>
            <div className='close-icon' onClick={handleClick}><img src="https://img.icons8.com/material-rounded/24/000000/delete-sign.png" alt="close" /></div>
            <h2>{isSignUp ? 'Create Account' : "Login In"}</h2>
            <p>By Clicking you agree our Terms and Condition</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder='email'
                    name='email'
                    id='email'
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                // value={email}
                />
                <input
                    type="password"
                    placeholder='password'
                    name='password'
                    id='password'
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                // value={password}
                />
                {isSignUp &&
                    <input
                        type="password"
                        placeholder='confirm password'
                        name='password-check'
                        id='password-check'
                        required={true}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    // value={password}
                    />}
                <input className='secondary-button' type='submit' />
                <p>{error}</p>
            </form>
            <hr />
            <h3>GET THE APP</h3>
        </div>
    )
}
