import React from 'react'
import { useEffect, useState } from 'react';
import { getAllListCvByPostService } from '../../../service/cvService';

import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";


const ManageCv = () => {
    const [dataCv, setdataCv] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            try {
                let fetchData = async () => {
                    let arrData = await getAllListCvByPostService({
                        limit: PAGINATION.pagerow,
                        offset: 0,
                        postId: id
                    })
                    if (arrData && arrData.errCode === 0) {
                        setdataCv(arrData.data)
                        setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                    }
                }
                fetchData();
            } catch (error) {
                console.log(error)
            }
        }


    }, [])

    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllListCvByPostService({


            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            postId: id

        })
        if (arrData && arrData.errCode === 0) {
            setdataCv(arrData.data)

        }
    }

    return (

        <div>

            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Danh sách CV</h4>

                        <div className="table-responsive pt-2">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>
                                            STT
                                        </th>
                                        <th>
                                            Tên người nộp
                                        </th>
                                        <th>
                                            Số điện thoại
                                        </th>
                                        <th>
                                            Địa chỉ
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
                                    {dataCv && dataCv.length > 0 &&
                                        dataCv.map((item, index) => {

                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.userData.firstName + " " + item.userData.lastName}</td>
                                                    <td>{item.userData.phonenumber}</td>
                                                    <td>{item.userData.address}</td>
                                                    <td>{item.isChecked === 0 ? 'Chưa xem' : 'Đã xem'}</td>
                                                    <td>
                                                        <Link style={{ color: '#4B49AC', cursor: 'pointer' }} to={`/admin/user-cv/${item.id}/`}>Xem CV</Link>
                                                        &nbsp; &nbsp;

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

export default ManageCv
