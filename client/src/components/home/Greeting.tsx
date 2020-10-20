import React from 'react';
import { gql } from '@apollo/client';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    greeting: {
        fontSize: '20px',
        textTransform: 'uppercase',
        marginTop: '6.5rem',
    },
    question: {
        fontSize: '72px',
        fontWeight: theme.typography.fontWeightLight,
        padding: '3rem'
    },
}))

interface GreetingProps {
    firstName: string;
}

const Greeting = ({ firstName }: GreetingProps) => {
    const classes = useStyles();

    return (
        <>
        <Typography align="center" className={classes.greeting}>Hi {firstName}</Typography>
        <Typography align="center" className={classes.question}>What's on your mind?</Typography>
        </>
    )
}

export default Greeting;