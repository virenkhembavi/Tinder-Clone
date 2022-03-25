import React, { useEffect, useState } from 'react'
import ChatDisplay from './ChatDisplay'
import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import axios from 'axios'
import { useCookies } from 'react-cookie'

export default function Chat({ user }) {
    const [clickedUser, setClickedUser] = useState(null)

    const [cookie, setCookie, removeCookie] = useCookies(['user'])
    const [matchUser, setMatchUser] = useState([])
    const userId = cookie.UserId

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/userdata`, {
                params: { userId }
            })
            setMatchUser(response.data.matches)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getUser()
    }, [])

    // console.log(matchUser)
    return (
        <div className='chat-container'>
            <ChatHeader user={user} />
            <div>
                <button className='option' onClick={() => setClickedUser(null)}>Matches</button>
                <button className='option' disabled={!clickedUser}>Chat</button>
            </div>
            {!clickedUser && <MatchesDisplay matches={matchUser} setClickedUser={setClickedUser} />}
            {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
        </div>
    )
}
