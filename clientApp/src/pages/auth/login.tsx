import { ErrorMessage, Field, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form } from 'reactstrap';
import { LoginModel } from '../../models';
import { LoginSchema, save } from '../../utils';
import { AuthHeader } from './components';
import axios from 'axios';

export const LoginPage = () => {
    const history = useHistory();

    const onSubmit = async (data: LoginModel, { setSubmitting }: FormikHelpers<LoginModel>) => {
        setSubmitting(true);
        await axios({
            url: `${process.env.REACT_APP_AUTH_BASE_URL}auth/login`,
            method: 'POST',
            data,
        })
        .then((res) => res.data.data)
        .then((data) => {
            save('AUTH_USER', data);
            history.push('/dashboard');
        })
        .catch((err) => console.log({ err }))
        .finally(() => setSubmitting(false));
    }

    return (
        <Container style={{ maxWidth: 450, margin: '4em auto' }}>
            <AuthHeader message="Register" handleAction={() => history.push('/register')} />

            <div className="w-100 text-center">
                <h2 className="mt-4">Welcome</h2>

                <h4 className="text-primary mt-2">Please Login to Your Account</h4>
            </div>

            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={onSubmit}
            >
                {({ handleSubmit }) => {
                    return (
                        <Form className="mt-4" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="mb-2">
                                    <label htmlFor="username" className="form-label">Email address</label>
                                    <Field required type="email" autoComplete="new-email" className="form-control rounded" id="username" name="username" />
                                    <div className="form-error">
                                    <ErrorMessage name="username" />
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <Field required type="password" autoComplete="new-password" className="form-control rounded" id="password" name="password" />
                                    <div className="form-error">
                                    <ErrorMessage name="password" />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-4 mx-auto">
                                    <button className="btn btn-primary" type="submit">Login</button>
                                </div>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </Container>
    )
}