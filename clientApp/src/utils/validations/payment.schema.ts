import * as Yup from 'yup';

export const PaymentSchema = Yup.object().shape({
    email: Yup.string().email().required('Email must be provided'),
    firstName: Yup.string(),
    lastName: Yup.string(),
    amount: Yup.string()
        .required('Amount must be provided')
})