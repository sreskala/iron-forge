import { Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import InputField from '../components/form/InputField';
import Wrapper from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { toErrorMap } from '../utils/toErrorMap';
import login from './login';

const ForgotPassword = () => {
    const router = useRouter();
    const [complete, setComplete] = useState(false)
    const [,forgotPassword] = useForgotPasswordMutation();
    return (
        <Wrapper>
        <Formik
        initialValues={{ email: ""}}
        onSubmit={
            async (values, { setErrors }) => {
                await forgotPassword(values);
                setComplete(true)
            }
        }
        >
            {({values, handleChange, isSubmitting}) => complete ? (<div>Email sent</div>) : (
                <Form>
                    <InputField name="email" label='email' placeholder='email' type="email"/>
                    <Button type='submit' mt={4} variant="ghost" isLoading={isSubmitting}>Change Password</Button>
            </Form>
            )}
        </Formik>
        </Wrapper>  
    )
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);