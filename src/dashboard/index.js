import React from 'react';
import Routes from './routes';
import './dashboard.scss';
import Login from '../login/index'
class Dashboard extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
   
    return  <div className="dashboard">
    <Routes />
  </div>
 
  }
};


export default Dashboard;
