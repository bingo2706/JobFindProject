import React from 'react'
import Header from './container/header/header'
import Footer from './container/footer/Footer'
import Home from './container/home/home'
import JobPage from './container/JobPage/JobPage'
import DetailPage from './container/JobDetail/JobDetail'
import About from './container/About/About'
import Contact from './container/Contact/Contact'
import HomeAdmin from './container/system/HomeAdmin';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import header from './container/header/header'
function App() {
  return (
    <Router>
      <Switch >
        <div className="App">
          <Route exact path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
          <Route path="/about">
            <Header />
            <About />
            <Footer />
          </Route>
          <Route path="/contact">
            <Header />
            <Contact />
            <Footer />
          </Route>
          <Route path="/job">
            <Header />
            <JobPage />
            <Footer />
          </Route>
          <Route path="/admin/">

            <HomeAdmin />

          </Route>
          <Route path="/sign-in">
            <Header />

            <Footer />
          </Route>


          {/* <DetailPage /> */}
          <Route path="/detail-job">
            <Header />
            <DetailPage />
            <Footer />
          </Route>



          {/* Đoạn này để config các đường dẫn k tồn tại đều chuyển về trang mình muốn tạm thời để tạm trang chủ lun */}
          <Redirect to="/" />
          
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Switch >
    </Router>
  );
}

export default App;
