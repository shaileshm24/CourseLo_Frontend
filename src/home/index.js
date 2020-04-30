import React from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {
  return (
    <React.Fragment>
    <Header/>
    <div className="home container">
      <div>
        <div className="home_h1">
          <Link to={'/register'} class="signup">Sign Up</Link>
          <br></br>
           <label class="label">Already use CourseLo?</label>  <Link to={'/login'} class ="login">Log In</Link>
         
        </div>
      </div>
      <div>
        <p>
          
        </p>
        <img src={window.location.origin + '/images/1.jpg'} alt="boards" />
      </div>
      <div>
        <h1></h1>
        <p>
        
        </p>
        <img src={window.location.origin + '/images/2.png'} alt="teams" />
      </div>
    </div>
    </React.Fragment>
  );
};
export default Home;
