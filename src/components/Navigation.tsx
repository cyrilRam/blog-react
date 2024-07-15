import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
        <div className="header bg-gray-800 p-4">
            <div className="navigation flex justify-center">
                <ul className="flex space-x-4">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-amber-900 font-bold'
                                    : 'text-white hover:text-amber-500'
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/creation"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-amber-900 font-bold'
                                    : 'text-white hover:text-amber-500'
                            }
                        >
                            Creation
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navigation;
