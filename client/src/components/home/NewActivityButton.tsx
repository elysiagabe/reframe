import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
        boxShadow: 'none',
        // maxWidth: '300px',
        letterSpacing: '1.4px',
        borderRadius: '40px',
        margin: '32px',
        fontSize: '16px',
        padding: '14px 36px',
        '&:hover': {
            boxShadow: 'none'
        },
        // fontWeight: theme.typography.fontWeightMedium
    }
}))

const NewActivityButton = () => {
    const classes = useStyles();

    return (
        <Button variant="contained" color="primary" className={classes.button}>Start a Journal Entry</Button>
    )
}

export default NewActivityButton;