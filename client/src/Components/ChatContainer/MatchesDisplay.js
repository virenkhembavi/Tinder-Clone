import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { useCookies } from 'react-cookie'


export default function MatchesDisplay({ matches, setClickedUser }) {
  const [matchProfile, setMatchProfile] = useState(null)

  const matchedId = matches.map(({ user_id }) => user_id)

  // const matchArray = Object.entries(matchedId)

  // const match = JSON.stringify(matchedId)

  const getMatches = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/match`, {
        params: { userID: JSON.stringify(matchedId) }
      })
      setMatchProfile(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMatches()
  }, [])

  // user_id: "aee6544d-e85a-4d32-b256-36f2b490d404"

  // console.log(matches)
  console.log(matchProfile)

  return (
    <div className='matches-display'>
      {matchProfile?.map((match, index) => (
        <div className='match-card' key={{ index }} onClick={() => setClickedUser(match)}>
          <div className='img-container'>
            <img src={match?.url} />
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}

    </div>
  )
}
