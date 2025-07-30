import { Link } from 'react-router-dom';
import React from 'react';
import '@/assets/Footer.css';


export default function Footer() {

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-logo">🪴Friendly Fence Bulletin🪴</p>

          <nav className="footer-links">
          
          <Link to="/privacy" className="navbar-link">Policy</Link>
          <Link to="/terms" className="navbar-link">Terms of Service</Link>
          <Link to="/report" className="navbar-link">Report a Post</Link>
          </nav>     
        
        <p className="footer-address">
          123 Garden Lane, Green City, GC 45678
        </p>
        <p className="footer-email">
          support@friendlyfence.com
        </p>
        <p className="footer-phone">
          Call us: <a href="tel:+1234567890">+1 (234) 567-890</a>
        </p>

        <p className="footer-social">
          Follow us on:
          <a href="https://twitter.com/friendlyfence" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://facebook.com/friendlyfence" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com/friendlyfence" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://linkedin.com/company/friendlyfence" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </p>

        <p className="footer-copy">&copy; {new Date().getFullYear()} Friendly Fence Bulletin. All rights reserved.</p>
      </div>
    </footer>
  );
}
