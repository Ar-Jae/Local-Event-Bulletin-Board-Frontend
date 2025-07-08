import React from 'react'

export default function ReportCard() {
  return (
    <>
        <p className="intro-text">
            Here you can view all reported posts. Please review them and take appropriate action.
        </p>
        <p className="note-text">
            Note: This is an admin-only section. Ensure you handle reports responsibly.
        </p>
        <button onClick={() => alert('Refresh Reports functionality not implemented yet.')}>Refresh Reports</button>
      
    </>
  )
}
