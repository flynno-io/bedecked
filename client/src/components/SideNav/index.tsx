// src/components/SideNav/index.tsx

import { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
// import styles from "./SideMenu.module.scss";

const SideNav = () => {
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const toggleDecks = () => {
      setIsDeckOpen(!isDeckOpen);
  };
    return (
        <div className="container-md">
            <div className="row rows-col-2">
                <div className="sidebar" >
                    <li className="">
                        <Link className="" to="/profile">
                            {/*Profile icon*/}
                        </Link>
                    </li>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/cards">Cards</NavLink>
                        </li>
                        <li className="nav-item">
                            <button className="" onClick={toggleDecks}>Decks</button>
                            {/*This is to determine if the Decks button is toggled or not and to display the submenu*/}
                            {isDeckOpen && (
                                <ul className="">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/decks">Your Decks</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/deck-builder">Deck Builder</NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile/:id">Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login or Register</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="col">
                    {/* Main content here based on routes*/}
                </div>
            </div>
        </div>
    );
};

export default SideNav
