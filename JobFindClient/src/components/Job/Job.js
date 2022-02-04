import React from 'react'
import moment from 'moment';
const Job = (props) => {
    const handleSplitTime = (time) => {
        return moment(time).fromNow();
    }
    return (
        <>
            <div class="job-items">
                <div class="company-img">
                    <a href="#"><img src={props.data.company.thumbnail} alt="" style={{ width: "85px", height: "85px" }} /></a>
                </div>
                <div class="job-tittle job-tittle2">
                    <a href="#">
                        <h4>{props.data.name}</h4>
                    </a>
                    <ul>
                        <li>{props.data.jobLevelData.value}</li>
                        <li><i class="fas fa-map-marker-alt"></i>{props.data.provinceData.value}</li>
                        <li>{props.data.salaryTypeData.value}</li>
                    </ul>
                </div>
            </div>
            <div class="items-link items-link2 f-right">
                <a href="job_details.html">{props.data.workTypeData.value}</a>
                <span style={{ position: 'absolute', right: '70px' }}>{handleSplitTime(props.data.createdAt)}</span>
            </div>

        </>
    )
}

export default Job
