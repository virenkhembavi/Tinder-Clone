import React, { useState } from 'react'

export default function ChatInput() {
    const[textArea, setTeextArea] = useState();
    return (
        <div className='chat-input'>
            <textarea value={textArea} onChange={(e)=> setTeextArea(e.target.value)} />
            <button className='secondary-button'>Submit</button>

        </div>
    )
}
