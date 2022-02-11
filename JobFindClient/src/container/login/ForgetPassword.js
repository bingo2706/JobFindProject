import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { checkUserPhoneService } from '../../service/userService';
import OtpForgetPassword from './OtpForgetPassword';
const ForgetPassword = () => {
    const [inputValues, setInputValues] = useState({
        phonenumber: '', isOpen: false,isSuccess:false, newPassword:'', confirmPassword: '',
    });

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };

    let handleOpenVerifyOTP = async () => {
        let res = await checkUserPhoneService(inputValues.phonenumber)
        if (res === true) {    
            setInputValues({...inputValues, ["isOpen"]: true})
        } else {      
            toast.error("Số điện thoại không tồn tại!")
        }

    }
    const recieveVerify = (success) =>{
        setInputValues({ ...inputValues, ["isOpen"]:false, ["isSuccess"]:true})
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
                                                <input type="number" value={inputValues.phonenumber} name="phonenumber" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Số điện thoại" />
                                            </div>
                                            {inputValues.isSuccess === true && 
                                                <>
                                                    <div className="form-group">
                                                        <input type="password" value={inputValues.newPassword} name="newPassword" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Mật khẩu mới" />
                                                    </div>    
                                                    <div className="form-group">
                                                        <input type="confirmPassword" value={inputValues.confirmPassword} name="confirmPassword" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Xác nhận mật khẩu" />
                                                    </div>
                                                    <div className="mt-3">
                                                        <a onClick="" className="btn1 btn1-block btn1-primary1 btn1-lg font-weight-medium auth-form-btn1" >SIGN UP</a>
                                                    </div>
                                                </>
                                            }                           
                                            <div className="mt-3">
                                                <a onClick={() => handleOpenVerifyOTP()} className="btn1 btn1-block btn1-primary1 btn1-lg font-weight-medium auth-form-btn1" >CONFIRM</a>
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
                <OtpForgetPassword dataUser={inputValues.phonenumber} recieveVerify={recieveVerify} />
            }
        </>
    )
}

export default ForgetPassword
