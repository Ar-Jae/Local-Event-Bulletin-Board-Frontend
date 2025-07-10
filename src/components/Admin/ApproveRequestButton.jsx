import React from 'react'

export default function ApproveRequestButton({ onApprove, onDisapprove, requestId }) {
  const handleApprove = () => {
    console.log('Approve button clicked for requestId:', requestId);
    if (onApprove) {
      onApprove(requestId);
    } else {
      console.warn('onApprove prop not provided');
    }
  };

  const handleDisapprove = () => {
    console.log('Disapprove button clicked for requestId:', requestId);
    if (onDisapprove) {
      onDisapprove(requestId);
    } else {
      console.warn('onDisapprove prop not provided');
    }
  };

  console.log('ApproveRequestButton rendered with requestId:', requestId);

  return (
    <div>
      <button onClick={handleApprove}>Approve</button>
      <button onClick={handleDisapprove}>Disapprove</button>
    </div>
  )
}
