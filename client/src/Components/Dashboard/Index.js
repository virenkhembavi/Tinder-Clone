import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import ChatContainer from '../ChatContainer/Chat'
import { useCookies } from 'react-cookie'



export default function Index() {
  const [user, setUser] = useState([])
  const [lastDirection, setLastDirection] = useState()
  const [cookie, setCookie, removeCookie] = useCookies(['user'])
  const [generatedUsers, setGenderedUsers] = useState([]);
  const userId = cookie.UserId




  // console.log(userId)
  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/userdata`, {
        params: { userId }
      })
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(user?.gender_interest)
  const gender = user?.gender_interest
  const getGenderedUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/generateduser`, {
        params: { gender: gender }
      })
      // console.log(gender)
      setGenderedUsers(response.data)
    } catch (error) {
      console.log(error)
    }

  }


  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put(`http://localhost:8080/addmatch`, {
        userId,
        matchedUserId
      })
      getUser()
    } catch (error) {
      console.log(error)
    }

  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }


  const swiped = (direction, swipedUserId) => {
    // console.log('removing: ' + nameToDelete)
    if (direction === 'right') {
      updateMatches(swipedUserId)

    }
    setLastDirection(direction)

  }

  // console.log(lastDirection)y

  // const matchedUserId = user?.matches.map(({ user_id }) => user_id).concat(userId)

  // console.log(match)
  // console.log(user?.matches[0])
  // const filteredGenderedUsers = generatedUsers?.filter(
  //   generatedUsers => !matchedUserId.includes(generatedUsers.user_id)
  // )


  useEffect(() => {
    getUser()
    getGenderedUser()
    // filteredGenderedUsers()
  }, [user, generatedUsers])

  // console.log(user)
  // console.log(generatedUsers)
  // console.log(filteredGenderedUsers())



  return (
    <>
      {user &&
        <div className='dashboard'>
          <ChatContainer user={user} />
          <div className='swiper-container'>
            <div className='card-Container'>
              {generatedUsers.map((character) =>
                <TinderCard className='swipe'
                  key={character.first_name}
                  onSwipe={(dir) => swiped(dir, character.user_id)}
                  onCardLeftScreen={() => outOfFrame(character.first_name)}>
                  <div style={{ backgroundImage: 'url(' + character.url + ')' }}
                    className='card'>
                    <h3>{character.first_name}</h3>
                  </div>
                </TinderCard>
              )}
            </div>
            <div className='swipe-info'>
              {lastDirection ? <p>You Swiped {lastDirection}</p> : <p />}
            </div>
          </div>
        </div>
      }
    </>
  )
}
