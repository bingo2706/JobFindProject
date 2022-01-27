import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ChangePassword from '../system/User/ChangePassword';
import CandidateInfo from './CandidateInfo';
import ManageCvCandidate from './ManageCvCandidate';

const HomeCandidate = () => {
    return (
        <Router>
            <Switch >
                <div className="container-scroller">
                    {/* partial:partials/_navbar.html */}

                    {/* partial */}
                    <div className="container-fluid page-body-wrapper">
                        {/* partial:partials/_settings-panel.html */}

                        {/* partial */}
                        {/* partial:partials/_sidebar.html */}

                        {/* partial */}
                        <div className="main-panel">
                            <div className="content-wrapper" style={{ marginLeft: '9%' }}>

                                <Route exact path="/candidate/info">
                                    <CandidateInfo />
                                </Route>
                                <Route exact path="/candidate/changepassword">
                                    <ChangePassword />
                                </Route>
                                <Route exact path="/candidate/cv-post/">
                                    <ManageCvCandidate />
                                </Route>
                            </div>
                            {/* content-wrapper ends */}
                            {/* partial:partials/_footer.html */}

                            {/* partial */}
                        </div>
                        {/* main-panel ends */}
                    </div>
                    {/* page-body-wrapper ends */}
                </div>

            </Switch >
        </Router>
    )
}

export default HomeCandidate
