import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { RouteComponentProps, withRouter } from 'react-router';

import * as GetLabelListTypes from './__generated__/GetLabelList';

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
    const { data, loading, error } = useQuery<GetLabelListTypes.GetLabelList>(GET_LABEL_LIST);

    if (loading) return <p>Loading...</p>;
    if (error || !data) return <p>ERROR</p>;

    if (data && data.labels) {
        console.log(data.labels)
    }



    return (
        <div>
            LABELS CONTAINER
            {data.labels.map(label => {
                return (
                    <div>
                    <h2 key={label.id}>{label.name}</h2>
                <h3>Definition</h3>
                <p>{label.def}</p>
                <h3>What does this sound like?</h3>
                <p>"{label.example}"</p>
                    </div>
                )
            })}

        </div>
    )
}

export default withRouter(Labels);