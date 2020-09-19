import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Logo from '../assets/reframe_logo.png';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

export const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        width: '25%',
        marginBottom: '32px'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        boxShadow: 'none',
        borderRadius: '40px',
        letterSpacing: '1.3px',
        '&:hover': {
            boxShadow: 'none'
        },
    },
}));

const SignUp = () => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <img className={classes.logo} src={Logo} alt="Reframe logo" />

                <Typography variant="h4">Create an Account</Typography>

                <Box mt={2}>
                    <Grid container justify="center">
                        <Grid item>
                            <Typography color="textSecondary">
                            Already have an account?&nbsp;
                            <Link component={RouterLink} to="/login">Sign in.</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                <form className={classes.form}>
                    <Grid container spacing={2}>
                        {/* FIRST NAME */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        {/* LAST NAME */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="lname"
                                name="lastName"
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                            />
                        </Grid>
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
                            />
                        </Grid>
                        {/* CONFIRM PASSWORD */}
                        <Grid item xs={12}>
                            <TextField 
                                autoComplete="current-password"
                                name="confirmPassword"
                                variant="outlined"
                                required
                                fullWidth
                                id="confirmPassword"
                                label="Confirm Password"
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
                        Register
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default SignUp;