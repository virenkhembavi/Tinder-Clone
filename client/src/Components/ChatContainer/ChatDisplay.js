import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ChatInput from './ChatInput'
import Chats from './Chats'

export default function ChatDisplay({ user, clickedUser }) {

    const [userMessages, setUserMessages] = useState(null)

    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id

    console.log(userId)
    console.log(clickedUserId)

    const getUserMessages = async () => {

        try {
            const response = await axios.get("http://localhost:8080/messages", {
                params: { userId: userId, correspondingUserId: clickedUserId }
            })
            setUserMessages(response.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUserMessages()
    }, [userMessages])

    console.log(userMessages)
    return (
        <>
            <Chats />
            <ChatInput />
        </>
    )
}
