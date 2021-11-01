import { Form, Modal, ModalBody } from "reactstrap";
import React, { useState } from 'react';
import { X } from 'react-feather';
import { v4 } from 'uuid';
import * as Yup from 'yup';
import dotenv from 'dotenv';
import { PaystackButton } from 'react-paystack';
import { ErrorMessage, Field, Formik, useFormik } from "formik";
import { extract } from "../../../utils";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { AuthenticatedUser } from "../../../models";

dotenv.config();

const styles = {
    width: '100%',
    margin: '2em auto 0',
    maxWidth: 700
}

interface Props {
    onClose: () => void;
}

export const CreditWalletModal: React.FC<Props> = ({ onClose }) => {
    const { values: { amount } } = useFormik({
        initialValues: { amount: '' },
        validationSchema: Yup.object().shape({
            amount: Yup.number().min(50).max(500000).required('Enter Amount')
        }),
        onSubmit: console.log
    })
    const [alert, setAlert] = useState<{ success: boolean; message: string } | null>(null);
    const user = extract<AuthenticatedUser>('AUTH_USER')!;

    if (!user) {
        return <Redirect to="/" />
    }
    console.log({ amount });
    
    return (
        <Modal isOpen styles={styles}>
            <ModalBody>
                <div className="p-3">
                    <div style={{ width: '2em', marginLeft: 'auto' }} onClick={onClose}>
                        <i><X /></i>
                    </div>

                    <h3 className="text-center">Credit Wallet</h3>

                    <div>
                    <Formik
                        initialValues={{
                            amount: '',
                        }}
                        validateOnMount
                        onSubmit={(model) => {
                            console.log({ model });
                        }}
                    >
                        {({ handleSubmit, values, isValid, setFieldError }) => {
                            const onSuccess = (reference: {reference: string}) => {
                                if (values && +values.amount < 50) {
                                    setFieldError('amount', 'Amount must be at least 50');
                                    return;
                                }
                                axios({
                                    method: 'POST',
                                    url: `${process.env.REACT_APP_PAYMENT_BASE_URL}payments/verify`,
                                    data: {
                                        ...values,
                                        reference: reference.reference
                                    },
                                    headers: {
                                        authorization: `Bearer ${user.token}`
                                    }
                                }).then(({ data }) => {
                                    setAlert({ success: true, message: data.message });
                                    setTimeout(() => setAlert(null), 4000);
                                })
                                .catch(({ response }) => {
                                    setAlert({ success: false, message: response?.data?.message });
                                    setTimeout(() => setAlert(null), 4000);
                                }).finally(() => setTimeout(() => onClose(), 6000));
                            };
                            const handleClose = () => console.log('close');
                            const componentProps = () => ({
                                reference: v4(),
                                text: 'Credit Wallet',
                                email: user.username,
                                amount: 1000,
                                onSuccess, onClose: handleClose,
                                publicKey: 'pk_test_86a34dfe9bb54afb6fd8d566918c1e83ed0c440e',
                            });

                            return (
                                <>
                                <Form className="p-4" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="mb-3">
                                        <label htmlFor="amount" className="form-label">Amount</label>
                                            <Field required type="number" min={50} className="form-control rounded" id="amount" name="amount" />
                                        <div className="form-error">
                                            <ErrorMessage name="amount" />
                                        </div>
                                    </div>
                                </div>
                            </Form>

                            {alert && <div className={`${alert.success ? 'success success-box' : 'form-error'} mb-2 centered`}>
                                {alert.message}
                            </div>}

                                <div className="row mt-3">
                                    {isValid ? <div className="col-6 mx-auto">
                                        <PaystackButton className="btn btn-success" {...componentProps()} />
                                    </div> : null}
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