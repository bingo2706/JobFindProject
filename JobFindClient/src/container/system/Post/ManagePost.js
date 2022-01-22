import React from 'react'
import { useEffect, useState } from 'react';
import { banPostService, getAllPostByAdminService, activePostService } from '../../../service/userService';
import moment from 'moment';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManagePost = () => {
    const [dataPost, setdataPost] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [user, setUser] = useState({})

    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData) {
                let fetchData = async () => {
                    let arrData = await getAllPostByAdminService({
                        limit: PAGINATION.pagerow,
                        offset: 0,
                        companyId: userData.company_id
                    })
                    if (arrData && arrData.errCode === 0) {
                        setdataPost(arrData.data)
                        setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                    }
                }
                fetchData();
                setUser(userData)
            }

        } catch (error) {
            console.log(error)
        }

    }, [])

    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllPostByAdminService({

            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            companyId: user.company_id
        })
        if (arrData && arrData.errCode === 0) {
            setdataPost(arrData.data)

        }
    }
    let handleBanPost = async (id) => {
        let res = await banPostService(id)
        if (res && res.errCode === 0) {
            toast.success("Ẩn bài đăng thành công")
            let post = await getAllPostByAdminService({
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                companyId: user.company_id
            })
            if (post && post.errCode === 0) {

                setdataPost(post.data);
                setCount(Math.ceil(post.count / PAGINATION.pagerow))
            }
        } else {
            toast.error("Ẩn bài đăng thất bại")
        }
    }
    let handleActivePost = async (id) => {
        let res = await activePostService({
            id: id
        })
        if (res && res.errCode === 0) {
            toast.success("Hiện bài đăng thành công")
            let post = await getAllPostByAdminService({
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                companyId: user.company_id
            })
            if (post && post.errCode === 0) {

                setdataPost(post.data);
                setCount(Math.ceil(post.count / PAGINATION.pagerow))
            }
        } else {
            toast.error("Hiện bài đăng thất bại")
        }
    }
    return (
        <div>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Danh sách bài đăng</h4>

                        <div className="table-responsive pt-2">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>
                                            STT
                                        </th>
                                        <th>
                                            Tên bài đăng
                                        </th>
                                        <th>
                                            Ngành
                                        </th>
                                        <th>
                                            Chức vụ
                                        </th>
                                        <th>
                                            Hình thức làm việc
                                        </th>
                                        <th>
                                            Ngày kết thúc
                                        </th>
                                        <th>
                                            Trạng thái
                                        </th>
                                        <th>
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPost && dataPost.length > 0 &&
                                        dataPost.map((item, index) => {
                                            let date = moment.unix(item.time_end / 1000).format('DD/MM/YYYY')
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.jobTypeData.value}</td>
                                                    <td>{item.jobLevelData.value}</td>
                                                    <td>{item.workTypeData.value}</td>
                                                    <td>{date}</td>
                                                    <td>{item.statusPostData.value}</td>
                                                    <td>
                                                        <Link style={{ color: '#4B49AC' }} to={`/admin/list-cv/${item.id}/`}>View</Link>
                                                        &nbsp; &nbsp;
                                                        <Link style={{ color: '#4B49AC' }} to={`/admin/edit-post/${item.id}/`}>Edit</Link>
                                                        &nbsp; &nbsp;
                                                        {item.statusId === 'S1' ? <>
                                                            <a style={{ color: '#4B49AC', cursor: 'pointer' }} onClick={() => handleBanPost(item.id)}  >Ban</a>
                                                            &nbsp; &nbsp;
                                                        </>
                                                            : <>
                                                                <a style={{ color: '#4B49AC', cursor: 'pointer' }} onClick={() => handleActivePost(item.id)}  >Active</a>
                                                            </>
                                                        }


                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <ReactPaginate
                        previousLabel={'Quay lại'}
                        nextLabel={'Tiếp'}
                        breakLabel={'...'}
                        pageCount={count}
                        marginPagesDisplayed={3}
                        containerClassName={"pagination justify-content-center pb-3"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        activeClassName={"active"}
                        onPageChange={handleChangePage}
                    />
                </div>

            </div>

        </div>
    )
}

export default ManagePost
