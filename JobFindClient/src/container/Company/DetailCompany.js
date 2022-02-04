import React from 'react'
import { getDetailCompanyById } from '../../service/userService';
import './DetailCompany.scss';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Link, useParams } from "react-router-dom";
import { dateFormat } from '../../util/constant';
const DetailCompany = () => {
    const [dataCompany, setdataCompany] = useState({})
    const { id } = useParams();

    useEffect(() => {
        if (id) {

            let fetchCompany = async () => {
                let res = await getDetailCompanyById(id)
                if (res && res.errCode === 0) {
                    setdataCompany(res.data)
                }
            }
            fetchCompany()

        }
    }, [])

    let formatDate = (time) => {
        let a = moment.unix(new Date().getTime() / 1000).format('DD/MM/YYYY')
        let b = moment.unix(time / 1000).format('DD/MM/YYYY')

        var start = moment(b, "DD/MM/YYYY");
        var end = moment(a, "DD/MM/YYYY");

        //Difference in number of days

        return (moment.duration(start.diff(end)).asDays())
    }



    return (
        <div className='container-detail-company'>
            <div className="company-cover">
                <div className="container">
                    <div className="cover-wrapper">
                        <img src={dataCompany.coverimage} alt="" className="img-responsive cover-img" width="100%" height="236px" />
                    </div>
                    <div className="company-detail-overview">
                        <div id="company-logo">
                            <div className="company-image-logo">
                                <img src={dataCompany.thumbnail} alt="Công ty Cổ phần Tập đoàn Hoa Sen" className="img-responsive" />
                            </div>
                        </div>
                        <div className="company-info">
                            <h1 className="company-detail-name text-highlight">{dataCompany.name}</h1>
                            <div className="d-flex">
                                <p className="website">
                                    <i className="fas fa-globe-americas"></i>
                                    <a href={dataCompany.website} target="_blank">{dataCompany.website}</a>
                                </p>
                                <p className="company-size">
                                    <i className="far fa-building"></i>
                                    {dataCompany.amountemployer}+ nhân viên
                                </p>
                            </div>
                        </div>
                        <div className="box-follow">
                            <a className="btn btn-follow btn-primary-hover">Theo dõi công ty</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="detail">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="company-info box-white">
                                <h4 className="title">Giới thiệu công ty</h4>
                                <div className="box-body">
                                    <p dangerouslySetInnerHTML={{ __html: dataCompany.descriptionHTML }}></p>
                                </div>
                            </div>
                            <div className="job-listing box-white">
                                <h4 className="title">Tuyển dụng</h4>
                                <div className="box-body">
                                    {dataCompany && dataCompany.postData && dataCompany.postData.length > 0 &&
                                        dataCompany.postData.map((item, index) => {
                                            return (
                                                <div key={index} className="job-item  job-ta result-job-hover" data-job-id={589972} data-job-position={1}>
                                                    <div className="avatar">
                                                        <Link to={`/detail-job/${item.id}`} className="company-logo">
                                                            <img src={dataCompany.thumbnail} className="w-100" alt="Công ty Cổ phần Tập đoàn Hoa Sen" title="Nhân Viên Tuyển Dụng - Đào Tạo" />
                                                        </Link>
                                                    </div>
                                                    <div className="body">
                                                        <div className="content">
                                                            <div className="ml-auto">
                                                                <h3 className="title-job">
                                                                    <Link className="underline-box-job" to={`/detail-job/${item.id}`}>
                                                                        <span className="bold transform-job-title" data-toggle="tooltip" title data-placement="top" data-container="body" data-original-title="Nhân Viên Tuyển Dụng - Đào Tạo">{item.name}</span>
                                                                        <i className="fa-solid fa-circle-check" data-toggle="tooltip" title data-placement="top" data-container="body" data-original-title="Tin từ nhà tuyển dụng đã xác thực" />
                                                                    </Link>
                                                                </h3>
                                                                <p className="company underline-box-job">
                                                                    <Link to={`/detail-job/${item.id}`} data-toggle="tooltip" title data-placement="top" data-container="body" data-original-title="Công ty Cổ phần Tập đoàn Hoa Sen">{item.name}</Link>
                                                                </p>
                                                            </div>
                                                            <div className="mr-auto text-right">
                                                                <p className="deadline">
                                                                    Còn <strong>{formatDate(item.time_end)}</strong> ngày để ứng tuyển
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex">
                                                            <div className="label-content ml-auto">
                                                                <label className="salary">{item.salaryTypeData.value}</label>
                                                                <label className="address" data-toggle="tooltip" title data-placement="top" data-container="body" data-original-title="Hà Nam">{item.provinceData.value}</label>
                                                                <label className="time">{moment(item.createdAt).fromNow()}</label>
                                                            </div>
                                                            <div className="icon mr-auto">
                                                                <div id="box-save-job-589972" className="box-save-job  box-save-job-hover   job-notsave " style={{ width: '23px' }}>
                                                                    <a href="javascript:void(0)" className="btn-save save" data-id={589972} data-title="Nhân Viên Tuyển Dụng - Đào Tạo">
                                                                        <span id="save-job-loading" style={{ display: 'none' }}>
                                                                            <img src="https://www.topcv.vn/v3/images/ap-loading.gif" style={{ width: '20px' }} />
                                                                        </span>
                                                                        <i className="fa-light fa-heart" />
                                                                    </a>
                                                                    <a href="javascript:void(0)" className="btn-unsave unsave text-highlight" data-toggle="tooltip" title data-id={589972} data-title="Nhân Viên Tuyển Dụng - Đào Tạo" data-placement="top" data-container="body" data-original-title="Bỏ lưu">
                                                                        <span id="unsave-job-loading" style={{ display: 'none' }}>
                                                                            <img src="https://www.topcv.vn/v3/images/ap-loading.gif" style={{ width: '20px' }} />
                                                                        </span>
                                                                        <i className="fa-solid fa-heart" />
                                                                    </a>
                                                                </div> </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }


                                    <div className="text-center">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="box-address box-white">
                                <h4 className="title">Địa chỉ công ty</h4>
                                <div className="box-body">
                                    <p className="text-dark-gray">
                                        <i className="fas fa-map-marker-alt" />{dataCompany.address}
                                    </p>
                                    <div className="company-map">
                                        <p className="map">Bản đồ trụ sở chính :</p>
                                        <iframe width="100%" height={270} frameBorder={0} style={{ border: 0 }} src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCVgO8KzHQ8iKcfqXgrMnUIGlD-piWiPpo&q=${dataCompany.address}&zoom=15&language=vi`} allowFullScreen>
                                        </iframe>
                                    </div>
                                </div>
                            </div>
                            <div className="box-sharing box-white">
                                <h4 className="title">Chia sẻ công ty tới bạn bè</h4>
                                <div className="box-body">
                                    <p>Sao chép đường dẫn</p>
                                    <div className="box-copy">
                                        <input type="text" defaultValue={window.location.href} className="url-copy" readOnly />
                                        <div className="btn-copy">
                                            <button className="btn-copy-url"><i className="fa-regular fa-copy" /></button>
                                        </div>
                                    </div>
                                    <p>Chia sẻ qua mạng xã hội</p>
                                    <div className="box-share">
                                        <a href="http://www.facebook.com/sharer/sharer.php?u=https://www.topcv.vn/cong-ty/cong-ty-co-phan-tap-doan-hoa-sen/8734.html" target="_blank"><img src="https://www.topcv.vn/v4/image/job-detail/share/facebook.png" alt="" /></a>
                                        <a href="https://twitter.com/intent/tweet?url=https://www.topcv.vn/cong-ty/cong-ty-co-phan-tap-doan-hoa-sen/8734.html" target="_blank"><img src="https://www.topcv.vn/v4/image/job-detail/share/twitter.png" alt="" /></a>
                                        <a href="https://www.linkedin.com/cws/share?url=https://www.topcv.vn/cong-ty/cong-ty-co-phan-tap-doan-hoa-sen/8734.html" target="_blank"><img src="https://www.topcv.vn/v4/image/job-detail/share/linkedin.png" alt="" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default DetailCompany
