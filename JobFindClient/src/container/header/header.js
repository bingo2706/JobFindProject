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
                                                    <li ><NavLink to="/" isActive={() => window.scrollTo(0, 0)}>Trang chủ</NavLink></li>
                                                    <li ><NavLink to="/job" isActive={() => window.scrollTo(0, 0)}>Việc làm </NavLink></li>
                                                    <li ><NavLink to="/company" isActive={() => window.scrollTo(0, 0)}>Công ty </NavLink></li>
                                                    <li ><NavLink to="/about" isActive={() => window.scrollTo(0, 0)}>Giới thiệu</NavLink></li>
                                                    {/* <li><NavLink to="/contact" >Contact</NavLink></li> */}
                                                </ul>
                                            </nav>
                                        </div>
                                        {/* <!-- Header-btn --> */}
                                        <div class="header-btn d-none f-right d-lg-block">
                                            {user ?
                                                <ul className="navbar-nav navbar-nav-right">
                                                    <li className="nav-item nav-profile dropdown">
                                                        <a className="nav-link dropdown-toggle box-header-profile" href="#" data-toggle="dropdown" id="profileDropdown">
                                                            <img style={{ objectFit: 'cover', width: '30px', height: '30px', borderRadius: '50%', marginLeft: '15px' }} src={user.image} alt="profile" />
                                                            <span className='header-name-user'>{user.firstName + " " + user.lastName}</span>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                                                            <Link to='/candidate/info' className="dropdown-item">
                                                                <i className="far fa-user text-primary" />
                                                                Thông tin
                                                            </Link>
                                                            <Link to="/candidate/cv-post/" className="dropdown-item">
                                                                <i className="far fa-file-word text-primary"></i>
                                                                Công việc đã nộp
                                                            </Link>
                                                            <Link to='/candidate/changepassword/' className="dropdown-item">
                                                                <i className="ti-settings text-primary" />
                                                                Đổi mật khẩu
                                                            </Link>
                                                            <NavLink to='/login' className="dropdown-item" isActive={
                                                                (match, location) => {
                                                                    if (match)
                                                                        localStorage.removeItem("userData")
                                                                }
                                                            }>
                                                                <i className="ti-power-off text-primary" />
                                                                Đăng xuất
                                                            </NavLink>
                                                        </div>
                                                    </li>
                                                </ul>
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
            </header >

        </>
    )
}

export default Header
