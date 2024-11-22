import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const [isDeckOpen, setIsDeckOpen] = useState(false);
    const toggleDecks = () => {
        setIsDeckOpen(!isDeckOpen);
    };

    return (
        <div className="container-md">
            <div className="row rows-col-2">
                <div className="sidebar" style="width: 300px">
                    <li className="">
                        <Link className=""></Link>
                    </li>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="">Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="">Cards</NavLink>
                        </li>
                        <li className="nav-item">
                            <button className="" onClick={toggleDecks}>Decks</button>
                            {/*This is to determine if the Decks button is toggled or not and to display the submenu*/}
                            {isDeckOpen && (
                                <ul className="">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="">Your Decks</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="">Deck Builder</NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="">Profile</NavLink>
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

export default Sidebar;