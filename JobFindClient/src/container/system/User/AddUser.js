import React from 'react'
import { useEffect, useState } from 'react';
import { createNewUser, getDetailUserById, UpdateUserService } from '../../../service/userService';
import { useFetchAllcode } from '../../../util/fetch';
import DatePicker from '../../../components/input/DatePicker';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import localization from 'moment/locale/vi';
import moment from 'moment';
const AddUser = () => {
    const [birthday, setbirthday] = useState('');
    const [isChangeDate, setisChangeDate] = useState(false)
    const [isActionADD, setisActionADD] = useState(true)
    const { id } = useParams();
    const [inputValues, setInputValues] = useState({
        password: '', firstName: '', lastName: '', address: '', phonenumber: '', genderId: '', roleId: '', id: '', dob: '', image: ''
    });

    let setStateUser = (data) => {
        setInputValues({
            ...inputValues,
            ["firstName"]: data.firstName,
            ["lastName"]: data.lastName,
            ["address"]: data.address,
            ["phonenumber"]: data.phonenumber,
            ["genderId"]: data.genderId,
            ["roleId"]: data.roleId,
            ["id"]: data.id,
            ["dob"]: data.dob,

        })
        setbirthday(moment.unix(+data.dob / 1000).locale('vi').format('DD/MM/YYYY'))
    }
    useEffect(() => {

        if (id) {
            let fetchUser = async () => {
                setisActionADD(false)
                let user = await getDetailUserById(id)
                if (user && user.errCode === 0) {
                    setStateUser(user.data)
                }
            }
            fetchUser()
        }
    }, [])

    const { data: dataGender } = useFetchAllcode('GENDER');
    const { data: dataRole } = useFetchAllcode('ROLE')


    if (dataGender && dataGender.length > 0 && inputValues.genderId === '' && dataRole && dataRole.length > 0 && inputValues.roleId === '') {
        console.log(dataRole)
        setInputValues({ ...inputValues, ["genderId"]: dataGender[0].code, ["roleId"]: dataRole[0].code })
    }

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };

    let handleOnChangeDatePicker = (date) => {
        setbirthday(date[0])
        setisChangeDate(true)

    }

    let handleSaveUser = async () => {
        if (isActionADD === true) {
            let res = await createNewUser({

                password: inputValues.password,
                firstName: inputValues.firstName,
                lastName: inputValues.lastName,
                address: inputValues.address,
                roleId: inputValues.roleId,
                genderId: inputValues.genderId,
                phonenumber: inputValues.phonenumber,
                image: 'https://res.cloudinary.com/bingo2706/image/upload/v1642521841/dev_setups/l60Hf_blyqhb.png',
                dob: new Date(birthday).getTime(),
            })
            if (res && res.errCode === 0) {
                toast.success("Thêm mới user thành công")
                setInputValues({
                    ...inputValues,
                    ["firstName"]: '',
                    ["lastName"]: '',
                    ["address"]: '',
                    ["phonenumber"]: '',
                    ["genderId"]: '',
                    ["roleId"]: '',
                    ["image"]: '',
                    ["password"]: '',
                })
                setbirthday('')
            } else {

                toast.error(res.errMessage)
            }
        } else {
            let res = await UpdateUserService({
                id: inputValues.id,
                firstName: inputValues.firstName,
                lastName: inputValues.lastName,
                address: inputValues.address,
                roleId: inputValues.roleId,
                genderId: inputValues.genderId,
                dob: isChangeDate === false ? inputValues.dob : new Date(birthday).getTime()
            })
            if (res && res.errCode === 0) {
                toast.success("Cập nhật người dùng thành công")

            } else {
                toast.error(res.errMessage)
            }

        }

    }

    return (
        <div className=''>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Thêm mới người dùng</h4>
                        <br></br>
                        <form className="form-sample">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Họ</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={inputValues.firstName} name="firstName" onChange={(event) => handleOnChange(event)} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Tên</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={inputValues.lastName} name="lastName" onChange={(event) => handleOnChange(event)} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Mật khẩu</label>
                                        <div className="col-sm-9">
                                            <input type="password" value={inputValues.password} disabled={isActionADD === true ? false : true} name="password" onChange={(event) => handleOnChange(event)} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Số điện thoại</label>
                                        <div className="col-sm-9">
                                            <input type="number" value={inputValues.phonenumber} disabled={isActionADD === true ? false : true} name="phonenumber" onChange={(event) => handleOnChange(event)} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Giới tính</label>
                                        <div className="col-sm-9">
                                            <select className="form-control" value={inputValues.genderId} name="genderId" onChange={(event) => handleOnChange(event)}>
                                                {dataGender && dataGender.length > 0 &&
                                                    dataGender.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.code}>{item.value}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Ngày sinh</label>
                                        <div className="col-sm-9">
                                            <DatePicker className="form-control" onChange={handleOnChangeDatePicker}
                                                value={birthday}

                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Địa chỉ</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={inputValues.address} name="address" onChange={(event) => handleOnChange(event)} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Quyền</label>
                                        <div className="col-sm-9">
                                            <select className="form-control" value={inputValues.roleId} name="roleId" onChange={(event) => handleOnChange(event)}>
                                                {dataRole && dataRole.length > 0 &&
                                                    dataRole.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.code}>{item.value}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" onClick={() => handleSaveUser()} className="btn1 btn1-primary1 btn1-icon-text">
                                <i class="ti-file btn1-icon-prepend"></i>
                                Lưu
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser
