import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
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
                <div class="header-area header-transparrent">
                    <div class="headder-top header-sticky">
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-lg-3 col-md-2">
                                    {/* <!-- Logo --> */}
                                    <div class="logo">
                                        <Link to={'/'}><img src="assets/img/logo/logo.png" alt="" /></Link>
                                    </div>
                                </div>
                                <div class="col-lg-9 col-md-9">
                                    <div class="menu-wrapper">
                                        {/* <!-- Main-menu --> */}
                                        <div class="main-menu">
                                            <nav class="d-none d-lg-block">
                                                <ul id="navigation">
                                                    <li><Link to={'/'}>Home</Link></li>
                                                    <li><Link to={'/job'}>Find a Jobs </Link></li>
                                                    <li><Link to={'/about'}>About</Link></li>
                                                    <li><Link to={'/contact'}>Contact</Link></li>
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
                                <div class="col-12">
                                    <div class="mobile_menu d-block d-lg-none"></div>
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
