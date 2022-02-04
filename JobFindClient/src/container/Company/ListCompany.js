import React from 'react'
import { getListCompany } from '../../service/userService';
import './ListCompany.scss';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { PAGINATION } from '../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
const ListCompany = () => {
    const [dataCompany, setdataCompany] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')


    useEffect(() => {
        try {
            let fetchData = async () => {
                let arrData = await getListCompany({


                    limit: PAGINATION.pagerow,
                    offset: 0

                })
                if (arrData && arrData.errCode === 0) {
                    setdataCompany(arrData.data)
                    setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                }
            }
            fetchData();
        } catch (error) {
            console.log(error)
        }

    }, [])
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getListCompany({


            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow

        })
        if (arrData && arrData.errCode === 0) {
            setdataCompany(arrData.data)

        }
    }
    return (
        <div className='container-company'>
            <h3 className='title'>DANH SÁCH CÁC CÔNG TY</h3>
            <div className='row list-company'>
                {dataCompany && dataCompany.length > 0 &&
                    dataCompany.map((item, index) => {
                        return (
                            <div key={index} className='col-md-4 col-sm-6 '>
                                <div className='box-item-company'>
                                    <div className='company-banner'>
                                        <Link to={`/detail-company/${item.id}`}>
                                            <div className='cover-wrapper'>
                                                <img src={item.coverimage}></img>
                                            </div>
                                        </Link>
                                        <div className='company-logo'>
                                            <Link to={`/detail-company/${item.id}`}>
                                                <img class="img-fluid" src={item.thumbnail} alt="Công ty Cổ phần Tập đoàn Hoa Sen" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div class="company-info">
                                        <h3>
                                            <Link to={`/detail-company/${item.id}`} class="company-name" >{item.name}</Link>
                                        </h3>
                                        <div class="company-description">
                                            <p dangerouslySetInnerHTML={{ __html: item.descriptionHTML }}></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }


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

    )
}

export default ListCompany
