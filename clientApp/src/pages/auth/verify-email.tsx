import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import { Container } from 'reactstrap';
import { AuthHeader } from './components';

export const VerifyEmailPage = () => {
    const { confirmationCode} = useParams<{ confirmationCode: string; }>();
    const history = useHistory();

    const verifyCode = useCallback(() => {
        if (confirmationCode) {
            axios({
                method: 'GET',
                url: `${process.env.REACT_APP_AUTH_BASE_URL}auth/confirm/${confirmationCode}`,
            })
            .then((res) => res.data)
            .then(() => history.push('/login'))
            .catch((err) => console.log({ err }))
        }
    }, [confirmationCode, history]);

    useEffect(() => {
        verifyCode();
    }, [verifyCode]);

    return (
        <Container style={{ maxWidth: 450, margin: '4em auto' }}>
            <AuthHeader message="Register" handleAction={() => history.push('/register')} />
        </Container>
    )
}