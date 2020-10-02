import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import Background from './assets/reframe_background.png';

import { makeStyles } from '@material-ui/core/styles';

// Components
import Login from './components/Login';
import SignUp from './components/SignUp';
import TopNav from './components/TopNav';
import Footer from './components/Footer';

const useStyles = makeStyles((theme) => ({
  noBackgroundImg: {
    backgroundColor: '#FFF',
  },
  backgroundImg: {
    marginTop: 'none',
    paddingTop: 'none',
    height: '100vh',
    width: '100%',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  },
  
}));

function App() {
  const classes = useStyles();

  const location = useLocation();

  let backgroundImg; 
  if (location.pathname === '/login' || location.pathname === '/signup') {
    backgroundImg = true;
  } else {
    backgroundImg = false;
  }

  return (
    <div className={backgroundImg ? classes.backgroundImg : classes.noBackgroundImg}>
      <TopNav />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>

        <Footer />

    </div>
  );
}

export default App;
