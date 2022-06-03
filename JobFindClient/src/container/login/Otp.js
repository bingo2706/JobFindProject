import React, { useEffect, useState } from 'react'
import './Otp.scss';
import firebase from '../../util/firebase';
import { toast } from 'react-toastify';
import { createNewUser, handleLoginService } from '../../service/userService';
const Otp = (props) => {
    const [dataUser, setdataUser] = useState({})
    const [otpnumber, setotpnumber] = useState('')
    const [inputValues, setInputValues] = useState({
        so1: '', so2: '', so3: '', so4: '', so5: '', so6: ''
    });

    useEffect(() => {
        if (props.dataUser) {
            let fetchOtp = async () => {
                await onSignInSubmit(false)
            }
            fetchOtp()

        }



    }, [props.dataUser])
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let configureCaptcha = () => {

        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            defaultCountry: "VN"
        });
    }
    let onSignInSubmit = async (isResend) => {
        if (!isResend)
            configureCaptcha()
        let phoneNumber = props.dataUser.phonenumber
        if (phoneNumber) {
            phoneNumber = "+84" + phoneNumber.slice(1);
        }


        console.log("check phonenumber", phoneNumber)
        const appVerifier = window.recaptchaVerifier;


        await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                toast.success("Đã gửi mã OTP vào điện thoại")

                // ...
            }).catch((error) => {
                console.log(error)
                toast.error("Gửi mã thất bại !")
            });
    }
    let submitOTP = async () => {
        const code = +(inputValues.so1 + inputValues.so2 + inputValues.so3 + inputValues.so4 + inputValues.so5 + inputValues.so6);

        await window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            toast.success("Đã xác minh số điện thoại !")
            let createUser = async () => {
                let res = await createNewUser({
                    password: props.dataUser.password,
                    firstName: props.dataUser.firstName,
                    lastName: props.dataUser.lastName,
                    phonenumber: props.dataUser.phonenumber,
                    roleId: props.dataUser.roleId,
                    image: 'https://res.cloudinary.com/bingo2706/image/upload/v1642521841/dev_setups/l60Hf_blyqhb.png',
                })
                if (res && res.errCode === 0) {
                    toast.success("Tạo tài khoản thành công")
                    handleLogin(props.dataUser.phonenumber, props.dataUser.password)


                } else {
                    toast.error(res.errMessage)
                }
            }
            createUser()

            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            toast.error("Mã OTP không đúng !")
        });
    }
    let resendOTP = async () => {
        await onSignInSubmit(true)
    }
    let handleLogin = async (phonenumber, password) => {

        let res = await handleLoginService({
            phonenumber: phonenumber,
            password: password
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
            <div className="container d-flex justify-content-center align-items-center container_Otp">
                <div className="card text-center">
                    <div className="card-header p-5">
                        <img src="https://raw.githubusercontent.com/Rustcodeweb/OTP-Verification-Card-Design/main/mobile.png" />
                        <h5 style={{ color: '#fff' }} className="mb-2">XÁC THỰC OTP</h5>
                        <div>
                            <small>mã đã được gửi tới sdt {props.dataUser && props.dataUser.phonenumber}</small>
                        </div>
                    </div>
                    <div className="input-container d-flex flex-row justify-content-center mt-2">
                        <input value={inputValues.so1} name="so1" onChange={(event) => handleOnChange(event)} type="text" className="m-1 text-center form-control rounded" maxLength={1} />
                        <input value={inputValues.so2} name="so2" onChange={(event) => handleOnChange(event)} type="text" className="m-1 text-center form-control rounded" maxLength={1} />
                        <input value={inputValues.so3} name="so3" onChange={(event) => handleOnChange(event)} type="text" className="m-1 text-center form-control rounded" maxLength={1} />
                        <input value={inputValues.so4} name="so4" onChange={(event) => handleOnChange(event)} type="text" className="m-1 text-center form-control rounded" maxLength={1} />
                        <input value={inputValues.so5} name="so5" onChange={(event) => handleOnChange(event)} type="text" className="m-1 text-center form-control rounded" maxLength={1} />
                        <input value={inputValues.so6} name="so6" onChange={(event) => handleOnChange(event)} type="text" className="m-1 text-center form-control rounded" maxLength={1} />
                    </div>
                    <div>
                        <small>
                            bạn không nhận được Otp ?
                            <a onClick={() => resendOTP()} style={{ color: '#3366FF' }} className="text-decoration-none ml-2">Gửi lại</a>
                        </small>
                    </div>
                    <div className="mt-3 mb-5">
                        <div id="sign-in-button"></div>
                        <button onClick={() => submitOTP()} className="btn btn-success px-4 verify-btn">Xác thực</button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Otp
