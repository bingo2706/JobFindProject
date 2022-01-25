import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import SendCvModal from '../../components/modal/SendCvModal'
import { getDetailPostByIdService } from '../../service/userService'
import moment from 'moment';
const JobDetail = () => {
    const { id } = useParams()
    const [isActiveModal, setAcitveModal] = useState(false)
    const [dataPost, setDataPost] = useState({
        idPost: '', namePost: '', descriptionHTMLPost: '', addressPost: '', jobType: '',
        workType: '', salaryType: '', jobLevelType: '', expType: '', genderPost: '',
        nameCompany: '', thumbnail: '', coverimage: '', descriptionHTMLCompany: '',
        website: '', addressCompany: '', phonenumber: '', amountemployer: '',
        taxnumber: '', time_end: ''
    });
    useEffect(() => {
        fetchPost(id)
    }, [])
    let fetchPost = async (id) => {
        let res = await getDetailPostByIdService(id)
        if (res && res.errCode === 0) {
            myPost(res.data)
        }
    }
    let myPost = (data) => {
        setDataPost({
            ...dataPost,
            ["idPost"]: data.id,
            ["namePost"]: data.name,
            ["descriptionHTMLPost"]: data.descriptionHTML,
            ["addressPost"]: data.address_id,
            ["jobType"]: data.jobTypeData.value,
            ["workType"]: data.workTypeData.value,
            ["salaryType"]: data.salaryTypeData.value,
            ["jobLevelType"]: data.jobLevelData.value,
            ["expType"]: data.expTypeData.value,
            ["genderPost"]: data.genderPostData.value,
            ["nameCompany"]: data.companyData.name,
            ["thumbnail"]: data.companyData.thumbnail,
            ["coverimage"]: data.companyData.coverimage,
            ["descriptionHTMLCompany"]: data.companyData.descriptionHTML,
            ["website"]: data.companyData.website,
            ["addressCompany"]: data.companyData.address,
            ["phonenumber"]: data.companyData.phonenumber,
            ["amountemployer"]: data.companyData.amountemployer,
            ["taxnumber"]: data.companyData.taxnumber,
            ["time_end"]: moment.unix(+data.time_end / 1000).locale('vi').format('DD/MM/YYYY')
        })

    }
    return (
        <>
            {/* <div id="preloader-active">
        <div className="preloader d-flex align-items-center justify-content-center">
            <div className="preloader-inner position-relative">
                <div className="preloader-circle"></div>
                <div className="preloader-img pere-text">
                    <img src="assets/img/logo/logo.png" alt="">
                </div>
            </div>
        </div>
    </div>
    <!-- Preloader Start --> */}

            <main>

                {/* <!-- Hero Area Start--> */}
                <div className="slider-area ">
                    <div className="single-slider slider-height2 d-flex align-items-center" style={{
                        backgroundImage: `url(${dataPost.coverimage})`
                    }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="hero-cap text-center">
                                        <h2>{dataPost.namePost}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Hero Area End -->
        <!-- job post company Start --> */}
                <div className="job-post-company pt-120 pb-120">
                    <div className="container">
                        <div className="row justify-content-between">
                            {/* <!-- Left Content --> */}
                            <div className="col-xl-7 col-lg-8">
                                {/* <!-- job single --> */}
                                <div className="single-job-items mb-30">
                                    {/* <Job /> */}
                                    <div className="job-items">
                                        <div className="company-img company-img-details">
                                            <img src={dataPost.thumbnail} alt="Ảnh bị lỗi" width={100} height={100} />
                                        </div>
                                        <div className="job-tittle">

                                            <h4>{dataPost.jobType}</h4>

                                            <ul>
                                                <li>{dataPost.workType}</li>
                                                <li><i className="fas fa-map-marker-alt"></i>{dataPost.addressPost}</li>
                                                <li>{dataPost.salaryType}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- job single End --> */}

                                <div className="job-post-details">
                                    <div className="post-details1 mb-50">
                                        {/* <!-- Small Section Tittle --> */}
                                        <div className="small-section-tittle">
                                            <h4>Mô tả công việc</h4>
                                        </div>
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: dataPost.descriptionHTMLPost }} />
                                </div>

                            </div>
                            {/* <!-- Right Content --> */}
                            <div className="col-xl-4 col-lg-4">

                                <div className="post-details3  mb-50">
                                    {/* <!-- Small Section Tittle --> */}
                                    <div className="small-section-tittle">
                                        <h4>Thông tin công việc</h4>
                                    </div>
                                    <ul>
                                        <li>Nơi làm việc : <span>{dataPost.addressPost}</span></li>
                                        <li>Hình thức làm việc : <span>{dataPost.workType}</span></li>
                                        <li>Lương :  <span>{dataPost.salaryType}</span></li>
                                        <li>Hạn nộp : <span>{dataPost.time_end}</span></li>
                                    </ul>
                                    <div className="btn" onClick={() => { setAcitveModal(true) }}>Apply Now</div>
                                </div>
                                <div className="post-details4  mb-50">
                                    {/* <!-- Small Section Tittle --> */}
                                    <div className="small-section-tittle">
                                        <h4>Thông tin công ty</h4>
                                    </div>
                                    <span>Tên công ty : {dataPost.nameCompany}</span>
                                    <ul>
                                        <li>Website     : <span>{dataPost.website}</span></li>
                                        <li>Địa chỉ     : <span>{dataPost.addressCompany}</span></li>
                                        <li>Điện thoại  : <span>{dataPost.phonenumber}</span></li>
                                        <li>Mã số thuế  : <span>{dataPost.taxnumber}</span></li>
                                        <li>Số nhân viên: <span>{dataPost.amountemployer}</span></li>
                                    </ul>
                                    <span>Mô tả công ty:</span>
                                    <div dangerouslySetInnerHTML={{ __html: dataPost.descriptionHTMLCompany }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- job post company End --> */}
                <SendCvModal isOpen={isActiveModal} onHide={() => setAcitveModal(false)} />
            </main>
        </>
    )
}

export default JobDetail
