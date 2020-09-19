import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Login from './components/Login';
import SignUp from './components/SignUp';
import Footer from './components/Footer';



function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
