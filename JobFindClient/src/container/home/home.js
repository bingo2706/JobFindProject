import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Categories from '../../components/home/Categories'
import FeatureJobs from '../../components/home/FeaturesJobs'
import { getListPostService } from '../../service/userService'
const Home = () => {
    const [dataFeature,setDataFeature] = useState([])

    let loadPost = async (limit, offset) => {
        let arrData = await getListPostService({
            limit: limit,
            offset: offset,  
            category_job_id: '',
            address_id: '',
            salary_job_id: '',
            category_joblevel_id: '',
            category_worktype_id: '',
            experience_job_id: '',
            sortName: false  
        })
        if (arrData && arrData.errCode === 0) {
            setDataFeature(arrData.data)        
        }
    }
    useEffect(() => {
        let fetchPost = async() =>{
            await loadPost(5,0)
        }
        fetchPost()
    },[])
    return (
       <>
        {/* <div id="preloader-active">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="preloader-circle"></div>
                <div class="preloader-img pere-text">
                    <img src="assets/img/logo/logo.png" alt="" />
                </div>
            </div>
        </div>
    </div> */}
    {/* <!-- Preloader Start --> */} 
   
    <main>
        {/* <!-- slider Area Start--> */}
        <div class="slider-area ">
            {/* <!-- Mobile Menu --> */}
            <div class="slider-active">
                <div class="single-slider slider-height d-flex align-items-center" 
                style={{ 
                    backgroundImage: `url("./assets/img/hero/h1_hero.jpg")` 
                  }}>
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-6 col-lg-9 col-md-10">
                                <div class="hero__caption">
                                    <h1>Find the most exciting startup jobs</h1>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Search Box --> */}
                    
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- slider Area End-->
        <!-- Our Services Start --> */}
        <div class="our-services section-pad-t30">
            <div class="container">
                {/* <!-- Section Tittle --> */}
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle text-center">
                            <span>FEATURED TOURS Packages</span>
                            <h2>Browse Top Categories </h2>
                        </div>
                    </div>
                </div>
                <Categories />
                {/* <!-- More Btn -->
                <!-- Section Button --> */}
                <div class="row">
                    <div class="col-lg-12">
                        <div class="browse-btn2 text-center mt-50">
                            <Link to="/job" class="border-btn2">Browse All Sectors</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Our Services End -->
        <!-- Online CV Area Start --> */}
         <div class="online-cv cv-bg section-overly pt-90 pb-120"  style={{ 
                    backgroundImage: `url("assets/img/gallery/cv_bg.jpg")` 
                  }}>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-10">
                        <div class="cv-caption text-center">
                            <p class="pera1">FEATURED TOURS Packages</p>
                            <p class="pera2"> Make a Difference with Your Online Resume!</p>
                            <Link to='/job' class="border-btn2 border-btn4">Find a Jobs</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Online CV Area End-->
        <!-- Featured_job_start --> */}
        <section class="featured-job-area feature-padding">
            <div class="container">
                {/* <!-- Section Tittle --> */}
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle text-center">
                            <span>Recent Job</span>
                            <h2>Featured Jobs</h2>
                        </div>
                    </div>
                </div>
                <FeatureJobs dataFeature={dataFeature}/>
            </div>
        </section>
        {/* <!-- Featured_job_end -->
        <!-- How  Apply Process Start--> */}
        <div class="apply-process-area apply-bg pt-150 pb-150"style={{ 
                    backgroundImage: `url("assets/img/gallery/how-applybg.png")` 
                  }}>
            <div class="container">
                {/* <!-- Section Tittle --> */}
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-tittle white-text text-center">
                            <span>Apply process</span>
                            <h2> How it works</h2>
                        </div>
                    </div>
                </div>
                {/* <!-- Apply Process Caption --> */}
                <div class="row">
                    <div class="col-lg-4 col-md-6">
                        <div class="single-process text-center mb-30">
                            <div class="process-ion">
                                <span class="flaticon-search"></span>
                            </div>
                            <div class="process-cap">
                               <h5>1. Search a job</h5>
                               <p>Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="single-process text-center mb-30">
                            <div class="process-ion">
                                <span class="flaticon-curriculum-vitae"></span>
                            </div>
                            <div class="process-cap">
                               <h5>2. Apply for job</h5>
                               <p>Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="single-process text-center mb-30">
                            <div class="process-ion">
                                <span class="flaticon-tour"></span>
                            </div>
                            <div class="process-cap">
                               <h5>3. Get your job</h5>
                               <p>Sorem spsum dolor sit amsectetur adipisclit, seddo eiusmod tempor incididunt ut laborea.</p>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
        

    </main>
       </>
    )
}

export default Home
