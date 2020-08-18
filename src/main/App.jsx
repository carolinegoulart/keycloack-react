import React from 'react';
import Secured from '../Secured';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AdminFormView from '../views/adminFormView/AdminFormView';
import AdminImportView from '../views/adminImportView/AdminImportView';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Secured} />
        <Route path="/register" exact={true} component={AdminFormView} />
        <Route path="/import" exact={true} component={AdminImportView} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
