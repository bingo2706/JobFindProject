import React from 'react'
import { useEffect, useState } from 'react';
import { createAllCodeService, getDetailAllcodeById, UpdateAllcodeService } from '../../../service/userService';
import { useFetchAllcode } from '../../../util/fetch';
import DatePicker from '../../../components/input/DatePicker';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../util/CommonUtils';
import { Spinner, Modal } from 'reactstrap'
import '../../../components/modal/modal.css'
import './AddJobType.scss';
const AddJobType = () => {


    const [isActionADD, setisActionADD] = useState(true)

    const [isLoading, setIsLoading] = useState(false)

    const { id } = useParams();

    const [inputValues, setInputValues] = useState({
        value: '', code: '', image: '', imageReview: '', isOpen: false,
    });

    useEffect(() => {

        if (id) {
            let fetchDetailJobType = async () => {
                setisActionADD(false)
                let allcode = await getDetailAllcodeById(id)
                if (allcode && allcode.errCode === 0) {
                    setInputValues({ ...inputValues, ["value"]: allcode.data.value, ["code"]: allcode.data.code, ["image"]: allcode.data.image, ["imageReview"]: allcode.data.image })
                }
            }
            fetchDetailJobType()
        }
    }, [])

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)

            setInputValues({ ...inputValues, ["image"]: base64, ["imageReview"]: objectUrl })

        }
    }
    let openPreviewImage = () => {
        if (!inputValues.imageReview) return;

        setInputValues({ ...inputValues, ["isOpen"]: true })
    }
    let handleSaveJobType = async () => {
        setIsLoading(true)
        if (isActionADD === true) {
            let res = await createAllCodeService({
                value: inputValues.value,
                code: inputValues.code,
                type: 'JOBTYPE',
                image: inputValues.image
            })
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success("Th??m lo???i c??ng vi???c th??nh c??ng")
                    setInputValues({
                        ...inputValues,
                        ["value"]: '',
                        ["code"]: '',
                        ["image"]: '',
                        ["imageReview"]: ''
                    })
                }
                else if (res && res.errCode === 2) {
                    toast.error(res.errMessage)
                }
                else toast.error("Th??m lo???i c??ng vi???c th???t b???i")
            }, 1000);
        } else {
            let res = await UpdateAllcodeService({
                value: inputValues.value,
                code: inputValues.code,
                id: id,
                image: inputValues.image
            })
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success("C???p nh???t lo???i c??ng vi???c th??nh c??ng")

                }
                else if (res && res.errCode === 2) {
                    toast.error(res.errMessage)
                }
                else toast.error("C???p nh???t lo???i c??ng vi???c th???t b???i")
            }, 1000);
        }
    }

    return (
        <div className=''>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">{isActionADD === true ? 'Th??m m???i lo???i c??ng vi???c' : 'C???p nh???t lo???i c??ng vi???c'}</h4>
                        <br></br>
                        <form className="form-sample">

                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">T??n lo???i c??ng vi???c</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={inputValues.value} name="value" onChange={(event) => handleOnChange(event)} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">M?? code</label>
                                        <div className="col-sm-9">
                                            <input type="text" value={inputValues.code} name="code" onChange={(event) => handleOnChange(event)} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">H??nh ???nh</label>
                                        <div className="col-sm-9">
                                            <input onChange={(event) => handleOnChangeImage(event)} accept='image/*' type="file" className="form-control form-file" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">H??nh ???nh hi???n th???</label>
                                        <div className="col-sm-9">
                                            <div style={{ backgroundImage: `url(${inputValues.imageReview})` }} onClick={() => openPreviewImage()} className="box-img-preview"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="btn1 btn1-primary1 btn1-icon-text" onClick={() => handleSaveJobType()}>
                                <i class="ti-file btn1-icon-prepend"></i>
                                L??u
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {
                inputValues.isOpen === true &&
                <Lightbox mainSrc={inputValues.imageReview}
                    onCloseRequest={() => setInputValues({ ...inputValues, ["isOpen"]: false })}
                />
            }
            {isLoading &&
                <Modal isOpen='true' centered contentClassName='closeBorder' >

                    <div style={{
                        position: 'absolute', right: '50%',
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Spinner animation="border"  ></Spinner>
                    </div>

                </Modal>
            }
        </div>
    )
}

export default AddJobType
