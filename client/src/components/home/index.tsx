import React from 'react';
import { Container, Box } from '@material-ui/core';
// Components
import Greeting from './Greeting';
import NewActivityButton from './NewActivityButton';

const Home = () => {
    return (
        <div>
            <Container maxWidth="md">
                <Box display="flex" flexWrap="wrap" flexDirection="column" alignItems="center">
                    <Greeting />
                    <NewActivityButton />
                </Box>
            </Container>
        </div>
    )
}

export default Home;