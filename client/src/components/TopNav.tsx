import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Box } from '@material-ui/core'; 

import Logo from '../assets/reframe_logo.png';

interface NavTabsProps {
    value: string;
    onChange: (event: React.ChangeEvent<{}>, newValue: string) => void; 
}

interface NavTabProps {
    label: string;
    value: string;
}

const StyledNavTabs = withStyles((theme: Theme) =>
    createStyles({
        indicator: {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            '& > span': {
                maxWidth: 40,
                width: '100%',
                backgroundColor: theme.palette.primary.light
            }
        },
    }),
)((props: NavTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span />}} /> );

const StyledNavTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            color: theme.palette.text.primary,
            marginRight: theme.spacing(2),
            '&:focus': {
                opacity: 1,
            },
        },
    }),
)((props: NavTabProps) => <Tab disableRipple {...props} /> );

const useStyles = makeStyles((theme: Theme) => ({
    logo: {
        width: '64px',
    },
    navContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '30px 0 30px 36px'
    },
}))

const TopNav = () => {
    const history = useHistory();
    const location = useLocation();

    // console.log(location)

    const classes = useStyles();
    const [value, setValue] = useState(location.pathname);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
        history.push(newValue)
    }

    return (
        <Box className={classes.navContainer}>
            <img src={Logo} alt="Reframe logo" className={classes.logo} />
            <StyledNavTabs value={value} onChange={handleChange} aria-label="Navigation Menu">
                <StyledNavTab label="Home" value="/" />
                <StyledNavTab label="Learn" value="/learn" /> 
                <StyledNavTab label="Account" value="/account"/>
            </StyledNavTabs>
        </Box>
    )
}

export default TopNav;