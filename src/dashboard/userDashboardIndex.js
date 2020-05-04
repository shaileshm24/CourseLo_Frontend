import React from 'react';
import Routes from './routes';
import './dashboard.scss';
class Dashboard extends React.Component{
  render(){
   
    return  <div className="dashboard">
    <Routes />
  </div>
  }
};


export default Dashboard;
