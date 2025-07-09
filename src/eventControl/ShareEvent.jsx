import React from 'react';

function ShareEvent({ eventUrl }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(eventUrl);
    alert('Event link copied to clipboard!');
  };

  return (
    <div className="share-event">
      <p>Share this event:</p>
      <input
        type="text"
        value={eventUrl}
        readOnly
        style={{ width: '80%' }}
        onFocus={e => e.target.select()}
      />
      <button onClick={handleCopy}>Copy Link</button>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(eventUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Share on Twitter
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Share on Facebook
      </a>
    </div>
  );
}

export default ShareEvent;
