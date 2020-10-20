import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client'
import { Link as RouterLink, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    TextField, 
    Link,
    Button,
    Grid,
    Box,
    Container
} from '@material-ui/core';

import { useForm } from '../utils/hooks';
import Logo from '../assets/reframe_logo.png';
import { isLoggedInVar } from '../cache';

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

const REGISTER_USER = gql`
    mutation register(
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(registerInput: {
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        }) {
            id
            firstName
            token
        }
    }
`;

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const SignUp: React.FC<FormErrors> = () => {
    const classes = useStyles();
    const history = useHistory();
    
    const [errors, setErrors] = useState({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null
    })

    const { onChange, onSubmit, formValues } = useForm(registerUser, {
        firstName: '',
        lastName: '', 
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [addUser, newUser] = useMutation(REGISTER_USER, {
        onCompleted({ register }) {
            localStorage.setItem('token', register.token as string)
            localStorage.setItem('userId', register.id as string)
            isLoggedInVar(true)
            history.push("/")
        },
        onError(error) {
            setErrors(error?.graphQLErrors[0]?.extensions?.exception?.errors)
        },
        variables: formValues
    });

    function registerUser() {
        addUser();
    }

    if (newUser.loading) return <p>Loading...</p>
    if (newUser.error) return <p>Error...</p>

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

                <form className={classes.form} onSubmit={onSubmit}>
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
                                value={formValues.firstName}
                                onChange={onChange}
                                error={errors.firstName ? true : false}
                                helperText={errors.firstName ? errors.firstName : null}
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
                                value={formValues.lastName}
                                onChange={onChange}
                                error={errors.lastName ? true : false}
                                helperText={errors.lastName ? errors.lastName : null}
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
                                type="password"
                                value={formValues.confirmPassword}
                                onChange={onChange}
                                error={errors.confirmPassword ? true : false}
                                helperText={errors.confirmPassword ? errors.confirmPassword: null}
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