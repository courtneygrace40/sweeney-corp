import React from 'react';
import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function Profile() {
    const { user } = useAuth();

    return (
        <Container>
            <h1>Profile Page</h1>
        </Container>
    );
}

export default Profile;
