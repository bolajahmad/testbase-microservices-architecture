import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  username: Yup.string().email().required('Email must be provided'),
  password: Yup.string()
    .required('Password must be provided')
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password canot exceed 16 xharacters')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[A-Z]/, 'Password must containe an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter'),
});

export const RegisterSchema = Yup.object().shape({
    username: Yup.string().email().required('Email must be provided'),
    firstName: Yup.string().required('Email must be provided'),
    lastName: Yup.string().required('Email must be provided'),
    password: Yup.string()
        .required('Password must be provided')
        .min(8, 'Password must be at least 8 characters')
        .max(16, 'Password canot exceed 16 xharacters')
        .matches(/[0-9]/, 'Password must contain a number')
        .matches(/[A-Z]/, 'Password must containe an uppercase letter')
        .matches(/[a-z]/, 'Password must contain a lowercase letter'),
    // confirmPassword: Yup.string().oneOf(
    //     [Yup.ref('password'), null],
    //     'Passwords must match'
    // ),
})