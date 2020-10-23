import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
// Page Components
import Home from './Home';
import Learn from './Learn';
import Account from './Account';
import Journal from './Journal';
import Resources from './Resources';
import NewJournalForm from './NewJournalForm';

export interface UserAccountType {
    accountInfo: {
        __typename: "User";
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
}

const GET_USER_INFO = gql`
    query userInfo {
        accountInfo {
            id
            firstName
            lastName
            email
        }
    }
`;

interface AuthPageProps extends RouteComponentProps<any>{
}

const AuthPageContainer: React.FC<AuthPageProps> = () => {
    const { data, loading, error } = useQuery<UserAccountType>(GET_USER_INFO);

    if (loading) return <p>Loading...</p>;
    if (error || !data) {
        return <p>Error :(</p>
    };

    return (
        <>
            <Route path="/learn">
                <Learn />
            </Route>
            <Route path="/account">
                <Account />
            </Route>
            <Route path="/journal">
                <Journal />
            </Route>
            <Route path="/resources">
                <Resources />
            </Route>
            <Route path="/new">
                <NewJournalForm />
            </Route>
            <Route exact path="/">
                <Home firstName={data.accountInfo.firstName} />
            </Route>
        </>
    )
}

export default withRouter(AuthPageContainer);