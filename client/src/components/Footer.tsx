import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Footer = () => {
    return (
        <footer>
            <Box pt={5}>
                <Typography variant="body2" color="textSecondary" align="center">
                    &copy; {new Date().getFullYear()} ReFrame by Elysia Gabe
                </Typography>
            </Box>
        </footer>
    );
};

export default Footer;