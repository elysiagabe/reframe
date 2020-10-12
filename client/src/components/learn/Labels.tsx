import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { RouteComponentProps, withRouter } from 'react-router';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import * as GetLabelListTypes from './__generated__/GetLabelList';

import Label from './Label';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            flexGrow: 1,
            display: "flex",
            // justifyContent: "space-between",
        },
    }),
);

const GET_LABEL_LIST = gql`
    query {
        labels {
            id
            name
            def
            example
        }
    }
`;

interface LabelsProps extends RouteComponentProps<any> {
}

const Labels: React.FC<LabelsProps> = () => {
    const classes = useStyles();

    const { data, loading, error } = useQuery<GetLabelListTypes.GetLabelList>(GET_LABEL_LIST);

    if (loading) return <p>Loading...</p>;
    if (error || !data) return <p>ERROR</p>;

    return (
        <Grid container className={classes.root} spacing={3} >
            
            {data.labels.map(label => {
                return (
                    <Grid item xs={4} key={label.id}>
                        <Label 
                            key={label.id}
                            name={label.name}
                            def={label.def}
                            example={label.example}
                        />
                    </Grid>
                )
            })}

        </Grid>
    )
}

export default withRouter(Labels);