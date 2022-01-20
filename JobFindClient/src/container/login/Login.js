import React from 'react'
import { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { handleLoginService } from '../../service/userService';
import { toast } from 'react-toastify';
const Login = () => {

    const [inputValues, setInputValues] = useState({
        password: '', phonenumber: ''
    });
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleLogin = async () => {

        let res = await handleLoginService({
            phonenumber: inputValues.phonenumber,
            password: inputValues.password
        })

        if (res && res.errCode === 0) {


            localStorage.setItem("userData", JSON.stringify(res.user))
            if (res.user.roleId === "ADMIN" || res.user.roleId === "EMPLOYER") {
                window.location.href = "/admin/"

            }
            else {
                window.location.href = "/"
            }
        }
        else {
            toast.error(res.errMessage)
        }
    }
    return (
        <>

            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth px-0">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                    <div className="brand-logo">
                                        <img src='/assetsAdmin/images/logo.svg' alt="logo" />
                                    </div>
                                    <h4>Hello! let's get started</h4>
                                    <h6 className="font-weight-light">Sign in to continue.</h6>
                                    <form className="pt-3">
                                        <div className="form-group">
                                            <input type="number" value={inputValues.phonenumber} name="phonenumber" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Phonenumber" />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" value={inputValues.password} name="password" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
                                        </div>
                                        <div className="mt-3">
                                            <a onClick={() => handleLogin()} className="btn1 btn1-block btn1-primary1 btn1-lg font-weight-medium auth-form-btn1" >SIGN IN</a>
                                        </div>
                                        <div className="my-2 d-flex justify-content-between align-items-center">
                                            <div className="form-check">
                                                <label className="form-check-label text-muted">
                                                    <input type="checkbox" className="form-check-input" />
                                                    Keep me signed in
                                                </label>
                                            </div>
                                            <a href="#" className="auth-link text-black">Forgot password?</a>
                                        </div>
                                        <div className="mb-2">
                                            <button type="button" className="btn1 btn1-block btn1-facebook auth-form-btn1">
                                                <i className="ti-facebook mr-2" />Connect using facebook
                                            </button>
                                        </div>
                                        <div className="text-center mt-4 font-weight-light">
                                            Don't have an account? <a href="register.html" className="text-primary">Create</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* content-wrapper ends */}
                </div>
                {/* page-body-wrapper ends */}
            </div>


        </>
    )
}

export default Login
