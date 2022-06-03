import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { checkUserPhoneService } from '../../service/userService';
import { useFetchAllcode } from '../../util/fetch';
import Otp from './Otp';
import handleValidate from '../../util/Validation';
import { Link } from 'react-router-dom'
const Register = () => {
    const [inputValidates, setValidates] = useState({
        phonenumber: true, password: true, firstName: true, lastName: true
    })
    const [inputValues, setInputValues] = useState({
        phonenumber: '', firstName: '', lastName: '', password: '', isOpen: false, dataUser: {}, roleId: ''
    });
    const { data: dataRole } = useFetchAllcode('ROLE');

    if (dataRole && dataRole.length > 0 && inputValues.roleId === '') {
        let arr = dataRole.filter(item => item.code !== "ADMIN")
        setInputValues({
            ...inputValues, ["roleId"]: arr[0].code

        })
    }

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };

    let handleOpenVerifyOTP = async () => {
        //   let checkPhonenumber = handleValidate(inputValues.phonenumber, "phone")
        // let checkPassword = handleValidate(inputValues.password, "password")
        // let checkFirstName = handleValidate(inputValues.firstName, "isEmpty")
        // let checkLastName = handleValidate(inputValues.lastName, "isEmpty")
        // if (!(checkPhonenumber === true && checkPassword === true && checkFirstName === true && checkLastName === true)) {
        //     setValidates({
        //         phonenumber: checkPhonenumber, password: checkPassword, firstName: checkFirstName, lastName: checkLastName
        //     })
        //     return
        // }
        let res = await checkUserPhoneService(inputValues.phonenumber)
        if (res === true) {
            toast.error("Số điện thoại đã tồn tại !")
        } else {
            setInputValues({
                ...inputValues, ["dataUser"]:
                {
                    phonenumber: inputValues.phonenumber,
                    firstName: inputValues.firstName,
                    lastName: inputValues.lastName,
                    password: inputValues.password,
                    roleId: inputValues.roleId
                }, ["isOpen"]: true
            })
        }

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
                                                {inputValidates.firstName && <p style={{ color: 'red' }}>{inputValidates.firstName}</p>}
                                            </div>
                                            <div className="form-group">
                                                <input type="text" value={inputValues.lastName} name="lastName" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Tên" />
                                                {inputValidates.lastName && <p style={{ color: 'red' }}>{inputValidates.lastName}</p>}
                                            </div>
                                            <div className="form-group">
                                                <input type="number" value={inputValues.phonenumber} name="phonenumber" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Số điện thoại" />
                                                {inputValidates.phonenumber && <p style={{ color: 'red' }}>{inputValidates.phonenumber}</p>}
                                            </div>
                                            <div className="form-group">
                                                <input type="password" value={inputValues.password} name="password" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
                                                {inputValidates.password && <p style={{ color: 'red' }}>{inputValidates.password}</p>}
                                            </div>
                                            <div className="form-group">
                                                <select className="form-control" value={inputValues.roleId} name="roleId" onChange={(event) => handleOnChange(event)}>
                                                    {dataRole && dataRole.length > 0 &&
                                                        dataRole.map((item, index) => {
                                                            if (item.code !== "ADMIN") {
                                                                return (
                                                                    <option key={index} value={item.code}>{item.value}</option>
                                                                )
                                                            }

                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="mt-3">
                                                <a onClick={() => handleOpenVerifyOTP()} className="btn1 btn1-block btn1-primary1 btn1-lg font-weight-medium auth-form-btn1" >SIGN UP</a>
                                            </div>
                                            <div className="text-center mt-4 font-weight-light">
                                                Already have an account? <Link to="/login" className="text-primary">Login</Link>
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
