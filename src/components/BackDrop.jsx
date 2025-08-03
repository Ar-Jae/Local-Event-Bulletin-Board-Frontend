
import React from 'react';
import '/src/assets/BackDrop.css';

export default function BackDrop() {
  // Renders a full-screen video background styled by BackDrop.css
  return (
    <div>
      <div className="BackgroundVid-Main">
        <video autoPlay loop muted className="BackgroundVid">
          <source src="https://cdn.pixabay.com/video/2025/05/27/282084_small.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}