import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
const Menu = () => {


    const [user, setUser] = useState({})
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)
    }, [])

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/admin/">
                        <i className="icon-grid menu-icon" />
                        <span className="menu-title">Trang chủ</span>
                    </Link>
                </li>
                {user && user.roleId === "ADMIN" &&
                    <>
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
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" href="#jobtype" aria-expanded="false" aria-controls="jobtype">
                                <i className="far fa-building menu-icon"></i>
                                <span className="menu-title">Quản lý loại công việc</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="jobtype">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item"> <Link className="nav-link" to="/admin/list-job-type/">Danh sách loại công việc</Link ></li>
                                    <li className="nav-item"> <Link className="nav-link" to="/admin/add-job-type/">Thêm loại công việc</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" href="#joblevel" aria-expanded="false" aria-controls="joblevel">
                                <i className="fas fa-level-up-alt menu-icon"></i>
                                <span className="menu-title">Quản lý cấp bậc</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="joblevel">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item"> <Link className="nav-link" to="/admin/list-job-level/">Danh sách cấp bậc</Link ></li>
                                    <li className="nav-item"> <Link className="nav-link" to="/admin/add-job-level/">Thêm cấp bậc</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" href="#worktype" aria-expanded="false" aria-controls="worktype">
                                <i className="fas fa-briefcase menu-icon"></i>
                                <span className="menu-title">Quản lý hình thức làm việc</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="worktype">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item"> <Link className="nav-link" to="/admin/list-work-type/">Danh sách hình thức</Link ></li>
                                    <li className="nav-item"> <Link className="nav-link" to="/admin/add-work-type/">Thêm hình thức</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" href="#salarytype" aria-expanded="false" aria-controls="salarytype">
                                <i className="fas fa-money-check-alt menu-icon"></i>
                                <span className="menu-title">Quản lý khoảng lương</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="salarytype">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item"> <Link className="nav-link" to="/admin/list-salary-type/">Danh sách khoảng lương</Link ></li>
                                    <li className="nav-item"> <Link className="nav-link" to="/admin/add-salary-type/">Thêm khoảng lương</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" href="#exptype" aria-expanded="false" aria-controls="exptype">
                                <i className="far fa-clock menu-icon"></i>
                                <span className="menu-title">Quản lý kinh nghiệm làm việc</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="exptype">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item"> <Link className="nav-link" to="/admin/list-exp-type/">Danh sách kinh nghiệm</Link ></li>
                                    <li className="nav-item"> <Link className="nav-link" to="/admin/add-exp-type/">Thêm kinh nghiệm</Link ></li>
                                </ul>
                            </div>
                        </li>
                    </>
                }
                {user && user.roleId === "EMPLOYER" &&
                    <>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" href="#company" aria-expanded="false" aria-controls="company">
                                <i className="far fa-clock menu-icon"></i>
                                <span className="menu-title">Quản lý công ty</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="company">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item"> <Link className="nav-link" to="/admin/add-company/">Tạo mới công ty</Link ></li>
                                    <li className="nav-item"> <Link className="nav-link" to="/admin/recruitment/">Tuyển dụng vào công ty</Link ></li>
                                    <li className="nav-item"> <Link className="nav-link" to="/admin/list-employer/">Danh sách nhân viên</Link ></li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="collapse" href="#post" aria-expanded="false" aria-controls="post">
                                <i className="far fa-clock menu-icon"></i>
                                <span className="menu-title">Quản lý bài đăng</span>
                                <i className="menu-arrow" />
                            </a>
                            <div className="collapse" id="post">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item"> <Link className="nav-link" to="/admin/add-post/">Tạo mới bài đăng</Link ></li>
                                    <li className="nav-item"> <Link className="nav-link" to="/admin/list-post/">Danh sách bài đăng</Link ></li>
                                </ul>
                            </div>
                        </li>
                    </>
                }

            </ul>
        </nav>

    )
}

export default Menu
