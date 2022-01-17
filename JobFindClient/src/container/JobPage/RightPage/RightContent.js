import React from 'react'
import Job from '../../../components/Job/Job'
const RightContent = () => {
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
                                            <span>39, 782 Jobs found</span>
                                            {/* <!-- Select job items start --> */}
                                            <div class="select-job-items">
                                                <span>Sort by</span>
                                                <select name="select">
                                                    <option value="">None</option>
                                                    <option value="">job list</option>
                                                    <option value="">job list</option>
                                                    <option value="">job list</option>
                                                </select>
                                            </div>
                                            {/* <!--  Select job items End--> */}
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Count of Job list End --> */}
                                {/* <!-- single-job-content --> */}
                                <div class="single-job-items mb-30">
                                    <Job />       
                                </div>                     
                                {/* <!-- single-job-content --> */}        
                                <div class="single-job-items mb-30">
                                    <Job />
                                    </div>                  
                                {/* <!-- single-job-content --> */}
                                <div class="single-job-items mb-30">

                                    <Job />
                                </div>
                                {/* <!-- single-job-content --> */}
                                <div class="single-job-items mb-30">

                                     <Job />
                                </div>
                                {/* <!-- single-job-content --> */}
                                <div class="single-job-items mb-30">
                                    <Job />

                                </div>
                                {/* <!-- single-job-content --> */}
                                
                                <div class="single-job-items mb-30"> 
                                      <Job />
                                </div>
                                {/* <!-- single-job-content --> */}
                                <div class="single-job-items mb-30">                                
                                     <Job /> 
                                </div>
                            </div>
                        </section>
                        {/* <!-- Featured_job_end --> */}
                    </div>
        </>
    )
}

export default RightContent
