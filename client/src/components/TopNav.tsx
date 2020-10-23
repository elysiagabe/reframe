import React, { useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Box } from '@material-ui/core'; 
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import SettingsIcon from '@material-ui/icons/Settings';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { isLoggedInVar } from '../cache';

import Logo from '../assets/reframe_logo.png';

interface NavTabsProps {
    value: string;
    onChange: (event: React.ChangeEvent<{}>, newValue: string) => void; 
}

interface NavTabProps {
    label: any;
    value: string;
}

const StyledNavTabs = withStyles((theme: Theme) =>
    createStyles({
        indicator: {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            '& > span': {
                maxWidth: 30,
                marginLeft: '16px',
                width: '100%',
                backgroundColor: theme.palette.primary.light
            }
        },
    }),
)((props: NavTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span />}} /> );

const StyledNavTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            fontSize: '12px',
            color: theme.palette.text.primary,
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
    const client = useApolloClient();
    const history = useHistory();
    const location = useLocation();

    const classes = useStyles();
    const [value, setValue] = useState(location.pathname);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
        // this signs user out
        if (newValue === "/login") {
            localStorage.clear()
            isLoggedInVar(false)
            client.resetStore()
        }
        history.push(newValue)
    }

    const handleClick = (event: React.ChangeEvent<{}>) => {
        setValue("/")
        history.push("/")
    }

    return (
        <Box className={classes.navContainer}>
            <Link to="/"><img src={Logo} alt="Reframe logo" className={classes.logo} onClick={handleClick}/></Link>
            <StyledNavTabs value={value} onChange={handleChange} aria-label="Navigation Menu" >
                <StyledNavTab label={<div><HomeIcon style={{verticalAlign: 'middle', fontSize: '16', marginRight: '4px'}}/>Home</div>} value="/" />

                <StyledNavTab label={<div><MenuBookIcon fontSize="small" style={{verticalAlign: 'middle', fontSize: '16', marginRight: '4px'}}/>My Journal</div>} value="/journal" />

                <StyledNavTab label={<div><EmojiObjectsIcon style={{verticalAlign: 'middle', fontSize: '16', marginRight: '4px'}}/>Learn</div>} value="/learn" />

                <StyledNavTab label={<div><AddAlertIcon color="error" style={{verticalAlign: 'middle', fontSize: '16', marginRight: '4px'}}/>Emergency</div>} value="/resources" />

                <StyledNavTab label={<div><SettingsIcon style={{verticalAlign: 'middle', fontSize: '16', marginRight: '4px'}}/>Account</div>} value="/account" />

                <StyledNavTab label={<div><ExitToAppIcon style={{verticalAlign: 'middle', fontSize: '16', marginRight: '4px'}}/>Sign Out</div>} value="/login" />
                
            </StyledNavTabs>
        </Box>
    )
}

export default TopNav;