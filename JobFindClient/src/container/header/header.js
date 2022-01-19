import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './header.scss';

const header = () => {

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
                                    <div className="logo">
                                        <NavLink to="/"><img src="assets/img/logo/logo.png" alt="" /></NavLink>
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-9">
                                    <div className="menu-wrapper">
                                        {/* <!-- Main-menu --> */}
                                        <div className="main-menu">
                                            <nav className="d-none d-lg-block">
                                                <ul id="navigation">
                                                    <li><NavLink to="/" isActive={() => window.scrollTo(0,0)}>Home</NavLink></li>
                                                    <li><NavLink to="/job" isActive={() => window.scrollTo(0,0)}>Find a Jobs </NavLink></li>
                                                    <li><NavLink to="/about" isActive={() => window.scrollTo(0,0)}>About</NavLink></li>
                                                    <li><NavLink to="/contact" >Contact</NavLink></li>
                                                </ul>
                                            </nav>
                                        </div>
                                        {/* <!-- Header-btn --> */}
                                        <div className="header-btn d-none f-right d-lg-block">
                                            <a href="#" className="btn head-btn1">Register</a>
                                            <a href="#" className="btn head-btn2">Login</a>
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

export default header
