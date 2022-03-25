import React from 'react'
import { useCookies } from 'react-cookie'


export default function ChatHeader({ user }) {
    const [cookie, setCookie, removeCookie] = useCookies(['user'])


    const logout = () => {
        removeCookie('UserId', cookie.UserId)
        removeCookie('AuthToken', cookie.AuthToken)
        window.location.reload()
    }
    return (
        <div className='chat-container-header'>
            <div className='profile'>
                <div className='img-container'>
                    <img src={user.url} alt={"Profile Picture of" + user.firstname} />
                    <div>{user.first_name}</div>
                </div>
                <img src="https://img.icons8.com/ios-glyphs/20/000000/exit.png" alt="logout" onClick={logout} />
            </div>
        </div>
    )
}
