import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

type LabelProps = {
    name: string,
    def: string,
    example: string
}

const useStyles = makeStyles({
    root: {
        height: 200,
        // width: 450,
        // margin: 20,
        boxShadow: "none"
    }
});

const Label = ({  name, def, example }: LabelProps) => {
    const classes = useStyles()

    return (
        <Card className={classes.root} >
            <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>{name}</Typography>
                <Typography>{def}</Typography>
                <Typography>Sounds like: {example}</Typography> 
            </CardContent>
        </Card>
    )
}

export default Label;