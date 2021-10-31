import { Form, Modal, ModalBody } from "reactstrap";
import React, { useEffect, useState } from 'react';
import { X } from 'react-feather';
import { ErrorMessage, Field, Formik } from "formik";
import { extract, PaymentSchema } from "../../../utils";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { AuthenticatedUser } from "../../../models";

const styles = {
    width: '100%',
    margin: '2em auto 0',
    maxWidth: 700
}

interface Props {
    onClose: () => void;
}

export const TransferFormModal: React.FC<Props> = ({ onClose }) => {
    const [alert, setAlert] = useState<{ success: boolean; message: string } | null>(null);
    const [users, setUsers] = useState<AuthenticatedUser[]>([]);

    const user = extract<{token: string}>('AUTH_USER')!;

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_AUTH_BASE_URL}users`,
            headers: {
                authorization: `Bearer ${(user as AuthenticatedUser)?.token}`
            }
        }).then((response) => response.data.data)
        .then((data) => {
            setUsers(data);
        })
        .catch((error) => console.log({ error }))
    }, []);

    if (!user) {
        return <Redirect to="/" />
    }

    return (
        <Modal isOpen styles={styles}>
            <ModalBody>
                <div className="p-3">
                    <div style={{ width: '2em', marginLeft: 'auto' }} onClick={onClose}>
                        <i><X /></i>
                    </div>

                    <h3 className="text-center">Transfer Money</h3>

                    <div>
                    <Formik
                        initialValues={{
                            firstName: '',
                            payerId: '',
                            amount: '',
                            lastName: '',
                        }}
                        validateOnMount
                        validationSchema={PaymentSchema}
                        onSubmit={(model) => {
                            console.log({ model });
                        }}
                    >
                        {({ handleSubmit, values, isValid }) => {
                            const user = users.find(({ id }) => id === values.payerId);

                            return (
                                <>
                                <Form className="p-4" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="mb-2">
                                        <label htmlFor="payerId" className="form-label">Recipient Email</label>
                                        <Field as="select" required className="form-control rounded" id="payerId" name="payerId">
                                                <option
                                                value="jdnvfknv fbvufhfe"
                                                disabled>Select User</option>
                                                {users?.map(({ username, id }) => (
                                                    <option key={username} value={id}>{username}</option>
                                                ))}
                                            </Field>
                                        <div className="form-error">
                                            <ErrorMessage name="email" />
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="amount" className="form-label">Amount</label>
                                            <Field required type="number" className="form-control rounded" id="amount" name="amount" />
                                        <div className="form-error">
                                            <ErrorMessage name="amount" />
                                        </div>
                                    </div>

                                    {values.payerId.length && user ? (
                                        <React.Fragment>
                                            <div className="mb-2">
                                                <label htmlFor="firstName" className="form-label">Receiver&rsquo; Name</label>
                                                <input 
                                                    readOnly 
                                                    value={user.firstName + ' ' + user.lastName} 
                                                    required className="form-control rounded" 
                                                    id="firstName" name="firstName" 
                                                />
                                            </div>
                                        </React.Fragment>
                                    ) : null}
                                </div>
                            </Form>

                            {alert && <div className={`${alert.success ? 'success success-box' : 'form-error'} mb-2 centered`}>
                                {alert.message}
                            </div>}

                                <div className="row mt-3">
                                    <div className="col-6 mx-auto">
                                        <button className="btn btn-success" disabled={!isValid}>Transfer</button>
                                    </div>
                                </div>
                                </>
                            )
                        }}
                    </Formik>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}