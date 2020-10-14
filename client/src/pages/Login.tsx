import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import {
    Typography, 
    TextField, 
    Link,
    Button,
    Grid, 
    Box, 
    Container
} from '@material-ui/core';
import { useStyles } from './SignUp';

import { useForm } from '../utils/hooks';
import Logo from '../assets/reframe_logo.png';
import { isLoggedInVar } from '../cache';

const LOGIN_USER = gql`
    mutation login(
        $email: String!
        $password: String!
    ){
        login(email: $email, password: $password) {
            id
            firstName
            token
        }
    }
`;

interface FormErrors {
    email?: string;
    password?: string;
}

const Login: React.FC<FormErrors> = () => {
    const classes = useStyles();
    const history = useHistory();

    const [errors, setErrors] = useState({
        email: null,
        password: null
    })

    const { onChange, onSubmit, formValues } = useForm(loginUserCallback, {
        email: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        // update(_, result) {
        //     history.push("/")
        // },
        onCompleted({ login }) {
            localStorage.setItem('token', login.token as string)
            localStorage.setItem('userId', login.id as string)
            isLoggedInVar(true)
            history.push("/")
        },
        onError(error) {
            setErrors(error?.graphQLErrors[0]?.extensions?.exception?.errors)
        },
        variables: formValues
    });

    function loginUserCallback() {
        loginUser();
    }

    if (loading) return <p>Loading...</p>

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

                <form className={classes.form} onSubmit={onSubmit}>
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
                                value={formValues.email}
                                onChange={onChange}
                                error={errors.email ? true : false}
                                helperText={errors.email ? errors.email : null}
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
                                value={formValues.password}
                                onChange={onChange}
                                error={errors.password ? true : false}
                                helperText={errors.password ? errors.password : null}
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