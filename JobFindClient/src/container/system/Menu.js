import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/">
                        <i className="icon-grid menu-icon" />
                        <span className="menu-title">Trang chủ</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                        <i className="icon-head menu-icon" />
                        <span className="menu-title">Quản lý User</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className="collapse" id="auth">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <Link className="nav-link" to="/admin/list-user/"> Danh sách người dùng </Link ></li>
                            <li className="nav-item"> <Link className="nav-link" to="/admin/add-user/"> Thêm người dùng </Link ></li>
                        </ul>
                    </div>
                </li>

            </ul>
        </nav>

    )
}

export default Menu
