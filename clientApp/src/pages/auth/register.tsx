import React from 'react';
import axios from 'axios';
import { Container, Form } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { AuthHeader } from './components';
import { ErrorMessage, Field, Formik, FormikHelpers } from 'formik';
import { UserRegisterModel } from '../../models';
import { RegisterSchema } from '../../utils';

export const RegisterPage = () => {
    const history = useHistory();

    const onSubmit = async (data: UserRegisterModel, { setSubmitting }: FormikHelpers<UserRegisterModel>) => {
        setSubmitting(true);
        console.log({ data });
        await axios({
            method: 'POST',
            url: `${process.env.REACT_APP_AUTH_BASE_URL}auth/register`,
            data
        }).then((res) => res.data)
        .then((data) => console.log({ data }))
        .catch((err) => console.log({ err }))
        .finally(() => setSubmitting(false));
    }

    return (
        <Container style={{ maxWidth: 450, margin: '4em auto' }}>
            <AuthHeader message="Login" handleAction={() => history.push('/login')} />

            <div className="w-100 text-center">
                <h2 className="mt-4">Hello</h2>

                <h4 className="text-primary mt-2">Enter your details</h4>
            </div>

            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: ''
                }}
                validationSchema={RegisterSchema}
                onSubmit={onSubmit}
            >
                {({ handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="mb-2">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <Field required className="form-control rounded" id="firstName" name="firstName" />
                                    <div className="form-error">
                                        <ErrorMessage name="firstName" />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <Field required className="form-control rounded" id="lastName" name="lastName" />
                                    <div className="form-error">
                                        <ErrorMessage name="lastName" />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="username" className="form-label">Email address</label>
                                    <Field required type="email" autoComplete="new-email" className="form-control rounded" id="username" name="username" />
                                    <div className="form-error">
                                        <ErrorMessage name="username" />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <Field required type="password" autoComplete="new-password" className="form-control rounded" id="password" name="password" />
                                    <div className="form-error">
                                        <ErrorMessage name="password" />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-4 mx-auto">
                                    <button className="btn btn-primary" type="submit">Register</button>
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Container>
    );
}