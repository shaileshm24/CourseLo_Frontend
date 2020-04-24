import React from 'react';
import { withRouter, Route } from 'react-router-dom';

import Boards from './Boards';
//import Board from './board/index';
//import ManagerDashboard from './ManagerBoard';

const Routes = props => {
  console.log('props.match', props.match);
  return (
    <div className="dashboard-inner">
      <Route exact path={`${props.match.path}`} component={Boards} />
      {/* {window.localStorage === null ? <>  <Route exact path = "/managerBoard" component = {ManagerDashboard} />  </> :
      <Route exact path ={`${props.match.path}`} component = {Boards} />} */}
   
    </div>
  );
};

export default withRouter(Routes);
