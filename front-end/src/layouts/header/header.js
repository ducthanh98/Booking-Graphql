import React from 'react';
import { NavLink } from "react-router-dom";
import AuthContext from '../../context/auth.context';

import './header.css';

export const Header = (props) => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <header className="main-navigation">
                    <div className="main-navigation_logo">
                        <h1>Events</h1>
                    </div>
                    <div className="main-navigation_item">
                        <ul>
                            {
                                !context.token && (<li> <NavLink to="/auth">Authenticate</NavLink> </li>)
                            }
                            {
                                context.token && (
                                    <>
                                        <li> <NavLink to="/bookings">Booking</NavLink> </li>
                                        <li> <NavLink to="/events">Events</NavLink> </li>
                                    </>
                                )
                            }


                        </ul>
                    </div>
                </header>
            )
        }

        }
    </AuthContext.Consumer>
)