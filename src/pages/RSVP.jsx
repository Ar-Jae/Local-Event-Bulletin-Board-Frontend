import React from 'react'

export default function RSVP() {
  return (
    <div>
        <h1>RSVP Page</h1>
        <p>Thank you for your interest in attending our event! Please fill out the RSVP form below.</p>
        <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            
            
            
            <button type="submit">Submit RSVP</button>
        </form>
    </div>
  )
}
