import React, { useState } from 'react'
import Navbar from '../Navbar/Index'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Index() {
  let navigate = useNavigate();

  const [cookie, setCookie, removeCookie] = useCookies(['user'])
  const [formData, setFormData] = useState({
    user_id: cookie.UserId,
    first_name: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    show_gender: false,
    gender_identity: 'man',
    gender_interest: 'women',
    url: '',
    about: '',
    matches: []
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:8080/users`, { formData })
      const success = response.status == 200
      // console.log(response)
      if (success) navigate("/dashboard")
    } catch (err) {
      console.log(err)
    }
  }
  const handleChange = (e) => {
    const value = e.target.type === 'checked' ? e.target.checked : e.target.value
    const name = e.target.name

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  console.log(formData)
  return (
    <>
      <Navbar
        // authToken={ }
        setShowModal={() => { }}
        showModal={false}
      // setIsSignUp={false} 
      />
      <div className='onboarding'>
        <h2>CREATE ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor='first_name'>First Name</label>
            <input
              id='first-name'
              name="first_name"
              placeholder='first name'
              type='text'
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />
            <label >Birthday</label>
            <div className='multiple-input-container'>
              <input
                id='dob-day'
                name="dob_day"
                placeholder='DD'
                type='number'
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id='dob-month'
                name="dob_month"
                placeholder='MM'
                type='number'
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id='dob-year'
                name="dob_year"
                placeholder='YYYY'
                type='number'
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>
            <label >Gender</label>
            <div className='multiple-input-container'>
              <input
                id='man-gender-identity'
                name="gender_identity"
                type='radio'
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === 'man'}
              />
              <label htmlFor='man-gender-identity' >Man</label>
              <input
                id='women-gender-identity'
                name="gender_identity"
                type='radio'
                value="women"
                onChange={handleChange}
                checked={formData.gender_identity === 'women'}
              />
              <label htmlFor='women-gender-identity' >Women</label>
              <input
                id='more-gender-identity'
                name="gender_identity"
                type='radio'
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === 'more'}
              />
              <label htmlFor='more-gender-identity' >More</label>
            </div>
            <label htmlFor='show-gender' >Show Gender On My Profile</label>
            <input
              id='show-gender'
              name="show_gender"
              type='checkbox'
              onChange={handleChange}
              checked={formData.show_gender}
            />
            <label >Show Me</label>
            <div className='multiple-input-container'>
              <input
                id='man-gender-interest'
                name="gender_interest"
                type='radio'
                value="man"
                onChange={handleChange}
                checked={formData.gender_interest === 'man'}
              />
              <label htmlFor='man-gender-interest' >Man</label>
              <input
                id='women-gender-interest'
                name="gender_interest"
                type='radio'
                value="women"
                onChange={handleChange}
                checked={formData.gender_interest === 'women'}
              />
              <label htmlFor='women-gender-interest' >Women</label>
              <input
                id='everyone-gender-interest'
                name="gender_interest"
                type='radio'
                value="everyone"
                onChange={handleChange}
                checked={formData.gender_interest === 'everyone'}
              />
              <label htmlFor='everyone-gender-interest' >Everyone</label>
            </div>
            <lable htmlFor="about">About Me</lable>
            <input
              type="text"
              placeholder="I Like Long Walks."
              id='about'
              required={true}
              name="about"
              onChange={handleChange}
              value={formData.about}
            />

            <input
              type="submit"

            />
          </section>
          <section>
            <lable htmlFor="profile-photo">Profile Photo</lable>
            <input
              type='url'
              name="url"
              onChange={handleChange}
              required={true}

            />
            <div className='photo-container'>
              {formData.url && <img src={formData.url} alt="PP" />}
            </div>

          </section>
        </form>
      </div>
    </>
  )
}
