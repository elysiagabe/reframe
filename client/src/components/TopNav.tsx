import React, { useState } from 'react';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Box } from '@material-ui/core'; 

import Logo from '../assets/reframe_logo.png';

interface NavTabsProps {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void; 
}

interface NavTabProps {
    label: string;
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
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    }

    return (
        <Box className={classes.navContainer}>
            <img src={Logo} alt="Reframe logo" className={classes.logo} />
            <StyledNavTabs value={value} onChange={handleChange} aria-label="Navigation Menu">
                <StyledNavTab label="Home" />
                <StyledNavTab label="Learn" /> 
                <StyledNavTab label="Account" />
            </StyledNavTabs>
        </Box>
    )
}

export default TopNav;