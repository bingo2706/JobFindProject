import React from 'react'
import {Link} from 'react-router-dom'
import Job from '../../../components/Job/Job'
const RightContent = (props) => {
    return (
        <>
             <div class="col-xl-9 col-lg-9 col-md-8">
                        {/* <!-- Featured_job_start --> */}
                        <section class="featured-job-area">
                            <div class="container">
                                {/* <!-- Count of Job list Start --> */}
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="count-job mb-35">
                                            <span>{props.count} Jobs found</span>
                                            {/* <!-- Select job items start --> */}
                                            {/* <div class="select-job-items">
                                                <span>Sort by</span>
                                                <select name="select">
                                                    <option value="">None</option>
                                                    <option value="">job list</option>
                                                    <option value="">job list</option>
                                                    <option value="">job list</option>
                                                </select>
                                            </div> */}
                                            {/* <!--  Select job items End--> */}
                                        </div>
                                    </div>
                                </div>
                                {props.post.map((data,index) =>{
                                        return(
                                            <Link to={`/detail-job/${data.id}`}>
                                            <div class="single-job-items mb-30">
                                              <Job key={data.id} data={data} />
                                            </div>
                                            </Link>
                                        )
                                    })}                         
                                                
                                
                                {/* <div class="single-job-items mb-30">
                                   <Job />
                                </div>
                               
                                <div class="single-job-items mb-30">

                                     <Job />
                                </div>
                              
                                <div class="single-job-items mb-30">
                                    <Job />

                                </div>
                               
                                
                                <div class="single-job-items mb-30"> 
                                      <Job />
                                </div>
                                
                                <div class="single-job-items mb-30">                                
                                     <Job /> 
                                </div>  */}
                            </div>
                        </section>
                        {/* <!-- Featured_job_end --> */}
                    </div>
        </>
    )
}

export default RightContent
