import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
        textDecoration: 'none',
        boxShadow: 'none',
        letterSpacing: '1.4px',
        borderRadius: '40px',
        margin: '32px',
        fontSize: '16px',
        padding: '14px 36px',
        '&:hover': {
            boxShadow: 'none'
        },
    }
}))

const NewActivityButton = () => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <Button 
            onClick={() => history.push("/new")} 
            variant="contained" 
            color="primary" 
            className={classes.button}
        >
                Start a Journal Entry
        </Button>
    )
}

export default NewActivityButton;