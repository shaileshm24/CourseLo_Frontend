import React from 'react';
import { withRouter, Route } from 'react-router-dom';

import Boards from './Boards';
import Board from './board/index';

const Routes = props => {
  console.log('props.match', props.match);
  return (
    <div className="dashboard-inner">
      <Route exact path={`${props.match.path}`} component={Boards} />
      <Route
        exact
        path={`${props.match.path}/b/:bId/:bSlug`}
        component={Board}
      />
    </div>
  );
};

export default withRouter(Routes);
