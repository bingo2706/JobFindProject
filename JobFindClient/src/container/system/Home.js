import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getStatisticalTypePost } from '../../service/userService';
import { PieChart } from 'react-minimal-pie-chart';
const Home = () => {
    const [user, setUser] = useState({})

    const [dataStatisticalTypePost, setDataStatisticalTypePost] = useState([])
    const getData = async (limit) => {
        let res = await getStatisticalTypePost(limit)
        let other = res.totalPost
        let otherPercent = 100
        let color = ['red', 'yellow', 'green', 'blue', 'orange']
        if (res.errCode === 0) {
            let newdata = res.data.map((item, index) => {
                other -= item.amount
                otherPercent -= Math.round((item.amount / res.totalPost * 100) * 100) / 100
                return {
                    title: item.jobTypeData.value,
                    value: Math.round((item.amount / res.totalPost * 100) * 100) / 100,
                    color: color[index],
                    amount: item.amount
                }
            })
            if (other > 0) {
                newdata.push({ title: "Lĩnh vực khác", value: Math.round(otherPercent * 100) / 100, color: color[4], amount: other })
            }
            setDataStatisticalTypePost(newdata)
        }
        else toast.error(res.message)
    }
    useEffect(async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)
        getData(4)
    }, [])
    return (
        <>
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <div className="row">
                        <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                            <h3 className="font-weight-bold">Xin chào {user.firstName + " " + user.lastName}</h3>
                            <h3 style={{ textTransform: "uppercase" }} className="font-weight-normal mb-0">Biểu đồ thống kê top lĩnh vực</h3>
                        </div>

                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-4">
                    {

                        dataStatisticalTypePost.map((item, index) => {
                            return (

                                <div style={{ marginBottom: "10px" }}>
                                    <div style={{ width: "50px", backgroundColor: item.color, height: "20px" }}></div>
                                    <span>{item.title}: {item.amount} bài</span>
                                </div>

                            )
                        })
                    }
                </div>
                <div style={{ width: "300px", height: "300px" }} className="col-md-8">
                    <PieChart
                        label={({ x, y, dx, dy, dataEntry }) => (
                            <text
                                x={x-5}
                                y={y}
                                dx={dx}
                                dy={dy}
                                dominant-baseline="central"
                                text-anchor="center"
                                style={{ fontSize: '4px' }}
                            >
                                {`${dataEntry.value}%`}

                            </text>
                        )}
                        data={dataStatisticalTypePost}

                    />;
                </div>
            </div>




        </>
    )
}

export default Home
