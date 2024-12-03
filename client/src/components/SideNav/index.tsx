// src/components/SideNav/index.tsx

import { useState, useContext } from 'react';
import { NavLink, Link } from "react-router-dom";
import "./SideMenu.scss";
import Avatar from "../Avatar";
import { AuthContext } from "../../context/AuthContext";


const SideNav = () => {
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const toggleDecks = () => {
      setIsDeckOpen(!isDeckOpen);
  };

  const authContext = useContext(AuthContext);

  const handleLogout =() => {
    authContext?.logout();
  }

    return (
        <div className="container-md">
            <div className="row rows-col-2">
                <div className="sidebar" >
                    <Link className="" to="/profile/:id">
                        <Avatar />
                    </Link>
                    <ul className="nav flex-column">
                        {authContext?.isAuthenticated ? (
                            <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/" onClick={handleLogout}>Logout</NavLink>
                            </li>
                        </>
                        ) : (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login or Register</NavLink>
                            </li>
                        </>
                        ) }
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/cards">Cards</NavLink>
                        </li>
                        <li className="nav-item">
                            <button className="sidebarbutton" onClick={toggleDecks}>Decks</button>
                            {/*This is to determine if the Decks button is toggled or not and to display the submenu*/}
                            {isDeckOpen && (
                                <ul className="decksmenu">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/decks">Your Decks</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/deck-builder">Deck Builder</NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideNav
