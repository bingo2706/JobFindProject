import React from 'react'
import { useEffect, useState } from 'react';

import Otp from './Otp';
const Register = () => {
    const [inputValues, setInputValues] = useState({
        phonenumber: '', firstName: '', lastName: '', password: '', isOpen: false, dataUser: {}
    });

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };

    let handleOpenVerifyOTP = () => {
        setInputValues({
            ...inputValues, ["dataUser"]:
            {
                phonenumber: inputValues.phonenumber,
                firstName: inputValues.firstName,
                lastName: inputValues.lastName,
                password: inputValues.password
            }, ["isOpen"]: true
        })
    }
    return (
        <>
            {inputValues.isOpen === false &&
                <div className="container-scroller">
                    <div className="container-fluid page-body-wrapper full-page-wrapper">
                        <div className="content-wrapper d-flex align-items-center auth px-0">
                            <div className="row w-100 mx-0">
                                <div className="col-lg-4 mx-auto">
                                    <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                        <div className="brand-logo">
                                            <img src="/assetsAdmin/images/logo.svg" alt="logo" />
                                        </div>
                                        <h4>New here?</h4>
                                        <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                                        <form className="pt-3">
                                            <div className="form-group">
                                                <input type="text" value={inputValues.firstName} name="firstName" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Họ" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" value={inputValues.lastName} name="lastName" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Tên" />
                                            </div>
                                            <div className="form-group">
                                                <input type="number" value={inputValues.phonenumber} name="phonenumber" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Số điện thoại" />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" value={inputValues.password} name="password" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
                                            </div>

                                            <div className="mt-3">
                                                <a onClick={() => handleOpenVerifyOTP()} className="btn1 btn1-block btn1-primary1 btn1-lg font-weight-medium auth-form-btn1" >SIGN UP</a>
                                            </div>
                                            <div className="text-center mt-4 font-weight-light">
                                                Already have an account? <a href="login.html" className="text-primary">Login</a>
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
            }

            {inputValues.isOpen === true &&
                <Otp dataUser={inputValues.dataUser} />
            }


        </>
    )
}

export default Register
