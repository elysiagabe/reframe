import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

import Background from './assets/reframe_background.png';

import { makeStyles } from '@material-ui/core/styles';

// Components
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AuthPageContainer from './pages/AuthPageContainer';
import TopNav from './components/TopNav';
import Footer from './components/Footer';

const useStyles = makeStyles((theme) => ({
  noBackgroundImg: {
    backgroundColor: '#FEFBFB',
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
  pageContainer: {
    position: 'relative',
    minHeight: '100vh',
  },
  contentWrap: {
    paddingBottom: '2rem',
  },
}));

function App() {
  const classes = useStyles();

  const location = useLocation();
  const history = useHistory();

  let backgroundImg;
  if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/') {
    backgroundImg = true;
  } else {
    backgroundImg = false;
  }

  const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `;

  function IsLoggedIn() {
    const { data } = useQuery(IS_LOGGED_IN);
    if (!data.isLoggedIn) {
      history.push("/login")
      return <Login />
    } else {
      return <AuthPageContainer />
    }
  }

  return (
    <div className={backgroundImg ? classes.backgroundImg : classes.noBackgroundImg}>
      <div className={classes.pageContainer}>
        <div className={classes.contentWrap}>
          {(location.pathname !== '/login' && location.pathname !== '/signup') ? <TopNav /> : null}

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>

            <IsLoggedIn />
          </Switch>

        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
