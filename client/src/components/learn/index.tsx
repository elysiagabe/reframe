import React from 'react';

import { Container, Typography } from '@material-ui/core';

import Labels from './Labels';

const Learn = () => {
    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom >Learning Center</Typography>
            <Typography paragraph variant="subtitle1" gutterBottom >
                Cognitive distortions are thoughts the cause some people to perceive reality inaccurately. They may contribute to negative feelings and emotions and, in some cases, more serious psychological disturtbances. Learning to identify and refute these thoughts can, over time, help us achieve more balanced and rational thinking and improve mood. 
            </Typography>
            <Labels />
        </Container>
    )
}

export default Learn;