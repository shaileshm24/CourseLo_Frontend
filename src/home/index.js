import React from 'react';
import './home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home container">
      <div>
        <div className="home_h1">
          <h1></h1>
          <p>
          </p>
          <Link to={'/register'} className="btn1">
            Sign Up
          </Link>
          <h2>
            Already use CourseLo? <Link to={'/login'}>Log In</Link>
          </h2>
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
  );
};
export default Home;
