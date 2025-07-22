import React from 'react';

export default function RSVPPage() {
  return (
    <div className="rsvp-container">
      <h1 className="rsvp-title">RSVP</h1>

      <p className="rsvp-intro">
        Let your neighbors know you're coming! Just fill in your name and hit submit.
      </p>

      <form
        className="rsvp-form"
        action="https://formspree.io/f/myzjapja" // Replace with your actual Formspree endpoint
        method="POST"
      >
        <input type="hidden" name="_subject" value="New Event RSVP" />

        <label>
          Your Name<br />
          <input type="text" name="name" placeholder="Jane Doe" required />
        </label>

        <label>
          Email (optional)<br />
          <input type="email" name="email" placeholder="you@example.com" />
        </label>

        <label>Will you attend?</label>
        <select id="attendance" name="attendance" defaultValue="">
          <option value="" disabled>Select your response</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="maybe">Maybe</option>
        </select>

        <button type ="submit">Submit RSVP</button>
      </form>

      <p className="rsvp-note">
        📍 Your RSVP will be shared with the event host only — not displayed publicly.
      </p>
    </div>
  );
}
