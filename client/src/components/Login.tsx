import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Logo from '../assets/reframe_logo.png';

import { useStyles } from './SignUp';
// import { makeStyles } from '@material-ui/core/styles';
import {
    Typography, 
    TextField, 
    Link,
    Button,
    Grid, 
    Box, 
    Container
} from '@material-ui/core';



const Login = () => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <img className={classes.logo} src={Logo} alt="Reframe logo" />

                <Typography variant="h4">Sign In</Typography>

                <Box mt={2}>
                    <Grid container justify="center">
                        <Grid item>
                            <Typography color="textSecondary">
                                Don't have an account yet?&nbsp; <Link component={RouterLink} to="/signup">Sign up.</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                <form className={classes.form}>
                    <Grid container spacing={2}>
                        {/* EMAIL */}
                        <Grid item xs={12}>
                            <TextField 
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoFocus
                            />
                        </Grid>
                        {/* PASSWORD */}
                        <Grid item xs={12}>
                            <TextField 
                                autoComplete="current-password"
                                name="password"
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                type="password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>

            </div>
        </Container>
    )
}

export default Login;