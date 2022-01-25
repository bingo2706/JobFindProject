import React from 'react'
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import './header.scss';

const Header = () => {

    const [user, setUser] = useState({})
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)
    }, [])

    let scrollHeader = () => {
        window.addEventListener("scroll", function () {
            var header = document.querySelector(".header-area");
            if (header) {
                header.classList.toggle("sticky", window.scrollY > 0)
            }
        })
    }

    scrollHeader()

    return (
        <>
            <header>
                {/* <!-- Header Start --> */}
                <div className="header-area header-transparrent">
                    <div className="headder-top header-sticky">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-3 col-md-2">
                                    {/* <!-- Logo --> */}
                                    <div className="logo" style={{ zIndex: 1 }}>
                                        <NavLink to="/"><img src="/assets/img/logo/logo.png" alt="" /></NavLink>
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-9">
                                    <div className="menu-wrapper">
                                        {/* <!-- Main-menu --> */}
                                        <div className="main-menu">
                                            <nav className="d-none d-lg-block">
                                                <ul id="navigation">
                                                    <li><NavLink to="/" isActive={() => window.scrollTo(0, 0)}>Home</NavLink></li>
                                                    <li><NavLink to="/job" isActive={() => window.scrollTo(0, 0)}>Find a Jobs </NavLink></li>
                                                    <li><NavLink to="/about" isActive={() => window.scrollTo(0, 0)}>About</NavLink></li>
                                                    <li><NavLink to="/contact" >Contact</NavLink></li>
                                                </ul>
                                            </nav>
                                        </div>
                                        {/* <!-- Header-btn --> */}
                                        <div class="header-btn d-none f-right d-lg-block">
                                            {user ?
                                                <div>
                                                    <a>
                                                        Xin chào {user.firstName + " " + user.lastName}
                                                    </a>
                                                </div>
                                                :
                                                <>
                                                    <Link to={'/register'} class="btn head-btn1">Register</Link>
                                                    <Link to={'/login'} class="btn head-btn2">Login</Link>
                                                </>
                                            }

                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Mobile Menu --> */}
                                <div className="col-12">
                                    <div className="mobile_menu d-block d-lg-none"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Header End --> */}
            </header>

        </>
    )
}

export default Header
