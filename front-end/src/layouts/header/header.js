import React from 'react';
import { NavLink } from "react-router-dom";
import './header.css';

export const Header = (props) => (
    <header className="main-navigation">
        <div className="main-navigation_logo">
            <h1>Events</h1>
        </div>
        <div className="main-navigation_item">
            <ul>
                <li> <NavLink to="/auth">Authenticate</NavLink> </li>
                <li> <NavLink to="/bookings">Booking</NavLink> </li>
                <li> <NavLink to="/events">Events</NavLink> </li>
            </ul>
        </div>
    </header>
)