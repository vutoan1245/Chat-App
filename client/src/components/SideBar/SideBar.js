import React, { Component } from 'react';

import './SideBar.css';

class SideBar extends Component {
  state = {
    
  }

  render() {
    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <li><p>My Chat Room</p></li>
            </ul>
        </div>
    )
    
  }
}

export default SideBar;
