import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '2rem',
    }
}))

const Footer = () => {
    const classes = useStyles();

    return (
        <footer >
            <Box className={classes.footer}>
                <Typography variant="body2" color="textSecondary" align="center">
                    &copy; {new Date().getFullYear()} ReFrame by Elysia Gabe
                </Typography>
            </Box>
        </footer>
    );
};

export default Footer;