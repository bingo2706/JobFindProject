import React from 'react'

const Menu = () => {
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link" href="index.html">
                        <i className="icon-grid menu-icon" />
                        <span className="menu-title">Dashboard</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                        <i className="icon-head menu-icon" />
                        <span className="menu-title">Quản lý User</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className="collapse" id="auth">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="pages/samples/login.html"> Danh sách người dùng </a></li>
                            <li className="nav-item"> <a className="nav-link" href="pages/samples/register.html"> Thêm người dùng </a></li>
                        </ul>
                    </div>
                </li>

            </ul>
        </nav>

    )
}

export default Menu
