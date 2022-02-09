import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../util/CommonUtils';
import { createCompanyService, getDetailCompanyByUserId, updateCompanyService } from '../../../service/userService';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Spinner, Modal } from 'reactstrap'
import '../../../components/modal/modal.css'
const AddCompany = () => {
    const mdParser = new MarkdownIt();
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [inputValues, setInputValues] = useState({
        image: '', coverImage: '', imageReview: '', coverImageReview: '', isOpen: false, name: '', phonenumber: '', address: '', website: '',
        amountemployer: '', taxnumber: '', descriptionHTML: '', descriptionMarkdown: '', isActionADD: true, id: ''
    });
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {

            fetchCompany(userData.id)
        }
        setUser(userData)
    }, [])
    let fetchCompany = async (userId) => {
        let res = await getDetailCompanyByUserId(userId)
        if (res && res.errCode === 0) {

            setInputValues({
                ...inputValues,
                ["name"]: res.data.name,
                ["phonenumber"]: res.data.phonenumber,
                ["address"]: res.data.address,
                ["image"]: res.data.thumbnail,
                ["coverImage"]: res.data.coverimage,
                ["descriptionHTML"]: res.data.descriptionHTML,
                ["descriptionMarkdown"]: res.data.descriptionMarkdown,
                ["amountemployer"]: res.data.amountemployer,
                ["taxnumber"]: res.data.taxnumber,
                ["website"]: res.data.website,
                ["imageReview"]: res.data.thumbnail,
                ["coverImageReview"]: res.data.coverimage,
                ["isActionADD"]: false,
                ["id"]: res.data.id
            })
        }
    }
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        const { name } = event.target;
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)

            setInputValues({ ...inputValues, [name]: base64, [`${name}Review`]: objectUrl })

        }
    }
    let openPreviewImage = () => {
        if (!inputValues.imageReview) return;

        setInputValues({ ...inputValues, ["isOpen"]: true })
    }
    let handleSaveCompany = async () => {
        setIsLoading(true)
        if (inputValues.isActionADD === true) {
            let res = await createCompanyService({
                name: inputValues.name,
                phonenumber: inputValues.phonenumber,
                address: inputValues.address,
                thumbnail: inputValues.image,
                coverimage: inputValues.coverImage,
                descriptionHTML: inputValues.descriptionHTML,
                descriptionMarkdown: inputValues.descriptionMarkdown,
                amountemployer: inputValues.amountemployer,
                taxnumber: inputValues.taxnumber,
                website: inputValues.website,
                userId: user.id
            })
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success("Tạo mới công ty thành công")
                    fetchCompany(user.id)

                } else {
                    toast.error(res.errMessage)
                }
            }, 1000);
        } else {
            let res = await updateCompanyService({
                name: inputValues.name,
                phonenumber: inputValues.phonenumber,
                address: inputValues.address,
                thumbnail: inputValues.image,
                coverimage: inputValues.coverImage,
                descriptionHTML: inputValues.descriptionHTML,
                descriptionMarkdown: inputValues.descriptionMarkdown,
                amountemployer: inputValues.amountemployer,
                taxnumber: inputValues.taxnumber,
                website: inputValues.website,
                id: inputValues.id
            })
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success("Cập nhật công ty thành công")
                } else {
                    toast.error(res.errMessage)
                }
            }, 1000);
        }
    }
    let handleEditorChange = ({ html, text }) => {
        setInputValues({
            ...inputValues,
            ["descriptionMarkdown"]: text,
            ["descriptionHTML"]: html
        })
    }
    return (
        <>
            <div className=''>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{inputValues.isActionADD === true ? 'Thêm mới công ty' : 'Cập nhật công ty'}</h4>
                            <br></br>
                            <form className="form-sample">

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Tên</label>
                                            <div className="col-sm-9">
                                                <input value={inputValues.name} name="name" onChange={(event) => handleOnChange(event)} type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Số điện thoại</label>
                                            <div className="col-sm-9">
                                                <input value={inputValues.phonenumber} name="phonenumber" onChange={(event) => handleOnChange(event)} type="number" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Mã số thuế</label>
                                            <div className="col-sm-9">
                                                <input value={inputValues.taxnumber} name="taxnumber" onChange={(event) => handleOnChange(event)} type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Số nhân viên</label>
                                            <div className="col-sm-9">
                                                <input value={inputValues.amountemployer} name="amountemployer" onChange={(event) => handleOnChange(event)} type="number" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Địa chỉ</label>
                                            <div className="col-sm-9">
                                                <input value={inputValues.address} name="address" onChange={(event) => handleOnChange(event)} type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Link website</label>
                                            <div className="col-sm-9">
                                                <input value={inputValues.website} name="website" onChange={(event) => handleOnChange(event)} type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Ảnh đại diện</label>
                                            <div className="col-sm-9">
                                                <input name='image' onChange={(event) => handleOnChangeImage(event)} type="file" className="form-control form-file" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Hiển thị</label>
                                            <div className="col-sm-9">
                                                <div style={{ backgroundImage: `url(${inputValues.imageReview})` }} onClick={() => openPreviewImage()} className="box-img-preview"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Ảnh bìa</label>
                                            <div className="col-sm-9">
                                                <input name='coverImage' onChange={(event) => handleOnChangeImage(event)} type="file" className="form-control form-file" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Hiển thị</label>
                                            <div className="col-sm-9">
                                                <div style={{ backgroundImage: `url(${inputValues.coverImageReview})` }} onClick={() => openPreviewImage()} className="box-img-preview"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="form-label">Giới thiệu công ty</label>
                                        <div className="form-group">

                                            <MdEditor
                                                style={{ height: '500px' }}
                                                renderHTML={text => mdParser.render(text)}
                                                onChange={handleEditorChange}
                                                value={inputValues.descriptionMarkdown}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <button onClick={() => handleSaveCompany()} type="button" className="btn1 btn1-primary1 btn1-icon-text">
                                    <i class="ti-file btn1-icon-prepend"></i>
                                    Lưu
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
            </div>
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
        </>
    )
}

export default AddCompany
