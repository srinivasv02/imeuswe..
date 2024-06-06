import React from 'react';
import './header.css'; // Make sure to adjust the path if needed

const Header = ({ onMemberClick }) => {
  return (
    <div className="app-bar">
      <div className="toolbar">
        <div className="left-section">
          <img src="/imelogo.jpeg" alt="Logo" className="logo" />
        </div>
        <div className="right-section">
          <div className="search-bar">
            <input type="text" placeholder="Search…" />
       
          </div>
          
          <img
            src="/noti.jpeg" 
            alt="Notification"
            className="notification-icon"
          />
          {/* End of Bell Icon */}
          <div className="profile-icon">R</div>
        </div>
      </div>
      <div className="nav-bar">
        <div className="nav-left">
          <h2>My Family</h2>
        </div>
        <div className="nav-right">
          <button className="members-button" onClick={onMemberClick}>Members</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
