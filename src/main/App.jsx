import React from 'react';
import Secured from '../Secured';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Secured} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
