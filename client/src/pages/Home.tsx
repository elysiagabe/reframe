import React from 'react';
import { Container, Box } from '@material-ui/core';
// Components
import Greeting from '../components/home/Greeting';
import NewActivityButton from '../components/home/NewActivityButton';

interface HomeProps {
    firstName: string;
}

const Home = ({ firstName }: HomeProps) => {
    console.log("NAME: ", firstName)
    return (
        <div>
            <Container maxWidth="md">
                <Box display="flex" flexWrap="wrap" flexDirection="column" alignItems="center" >
                    <Greeting firstName={firstName} />
                    <NewActivityButton />
                </Box>
            </Container>
        </div>
    )
}

export default Home;