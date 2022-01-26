import React,{useState,useEffect} from 'react'
import LeftBar from './LeftPage/LeftBar'
import RightContent from './RightPage/RightContent'
import { PAGINATION } from '../../util/constant';
import ReactPaginate from 'react-paginate';
import {getListPostService} from '../../service/userService'
const JobPage = () => {

    const [countPage,setCountPage] = useState(1)
    const [post,setPost] = useState([])
    const [count,setCount] = useState(0)
    const [numberPage,setNumberPage] = useState('')
    const [offset,setOffset] = useState(0)
    const [limit,setLimit] = useState(PAGINATION.pagerow)

    const [workType,setWorkType] = useState('')
    const [jobType,setJobType] = useState('')
    const [salary,setSalary] = useState('')
    const [exp,setExp] = useState('')
    const [jobLevel,setJobLevel]= useState('')
    const [jobLocation,setJobLocation] = useState('')

    let loadPost = async(limit,offset,sortName) =>{
        let arrData = await getListPostService({
            limit:limit,
            offset:offset,
            category_job_id:jobType,
            address_id:jobLocation,
            salary_job_id:salary,
            category_joblevel_id:jobLevel,
            category_worktype_id:workType,
            experience_job_id:exp,
            sortName:sortName
        })
        if(arrData && arrData.errCode === 0){
            setPost(arrData.data)
            setCountPage(Math.ceil(arrData.count / limit))
            setCount(arrData.count)
        }
    }

    useEffect(() => {
        let fetchPost = async() =>{
            await loadPost(limit,offset,false)
        }
        fetchPost();
    },[])

    const recieveWorkType = (data) =>{
        workType===data? setWorkType('') : setWorkType(data)
    }
    const recieveSalary = (data) =>{
       salary === data ? setSalary('') : setSalary(data)
    }
    const recieveExp = (data) =>{
        exp===data ? setExp('') : setExp(data)
    }
    const recieveJobType = (data) => {
        jobType===data ? setJobType('') : setJobType(data)
    }
    const recieveJobLevel = (data) => {
        jobLevel===data ? setJobLevel(''): setJobLevel(data)
    }
    const recieveLocation = (data) =>{
        jobLocation===data ? setJobLocation('') : setJobLocation(data)
    }
    useEffect(() => {
        let filterdata = async() => {
            let arrData = await getListPostService({
                limit:limit,
                offset:offset,
                category_job_id:jobType,
                address_id:jobLocation,
                salary_job_id:salary,
                category_joblevel_id:jobLevel,
                category_worktype_id:workType,
                experience_job_id:exp,
            })
            if(arrData && arrData.errCode === 0){
                setPost(arrData.data)
                setCountPage(Math.ceil(arrData.count / limit))
                setCount(arrData.count)
            }
        }
        filterdata()
    },[workType,jobLevel,exp,jobType,jobLocation,salary])
    const handleChangePage = (number) =>{
        setNumberPage(number.selected)
        loadPost(limit,number.selected*limit)
        setOffset(number.selected * limit)
    }
    return (
        <>

    <main>

        {/* <!-- Hero Area Start--> */}
        <div class="slider-area ">
            <div class="single-slider section-overly slider-height2 d-flex align-items-center"  style={{ 
                    backgroundImage: `url("assets/img/hero/about.jpg")` 
                  }}>
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="hero-cap text-center">
                                <h2>Get your job</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Hero Area End -->
        <!-- Job List Area Start --> */}
        <div class="job-listing-area pt-120 pb-120">
            <div class="container">
                <div class="row">
                    {/* <!-- Left content --> */}
                    <div class="col-xl-3 col-lg-3 col-md-4">
                        <div class="row">
                            <div class="col-12">
                                    <div class="small-section-tittle2 mb-45">
                                    <div class="ion"> <svg 
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        width="20px" height="12px">
                                    <path fill-rule="evenodd"  fill="rgb(27, 207, 107)"
                                        d="M7.778,12.000 L12.222,12.000 L12.222,10.000 L7.778,10.000 L7.778,12.000 ZM-0.000,-0.000 L-0.000,2.000 L20.000,2.000 L20.000,-0.000 L-0.000,-0.000 ZM3.333,7.000 L16.667,7.000 L16.667,5.000 L3.333,5.000 L3.333,7.000 Z"/>
                                    </svg>
                                    </div>
                                    <h4>Filter Jobs</h4>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Job Category Listing start --> */}
                        <LeftBar worktype={recieveWorkType} recieveSalary={recieveSalary} recieveExp={recieveExp}
                            recieveJobType={recieveJobType} recieveJobLevel={recieveJobLevel} recieveLocation={recieveLocation}
                        />
                        {/* <!-- Job Category Listing End --> */}
                    </div>
                    {/* <!-- Right content --> */}
                        <RightContent count={count} post={post}/>
                </div>
                <ReactPaginate
                        previousLabel={'Quay lại'}
                        nextLabel={'Tiếp'}
                        breakLabel={'...'}
                        pageCount={countPage}
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
       
        {/* <!--Pagination End  --> */}
        
    </main>
 
        </>
    )
}

export default JobPage
