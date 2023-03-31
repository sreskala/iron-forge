import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import { Button, FormControl, FormLabel, Input, Link } from '@chakra-ui/react';
import { useMutation } from 'urql';
import Wrapper from '../components/Wrapper';
import InputField from '../components/form/InputField';
import { useLoginMutation, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import Navbar from '../components/Navbar';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';

interface LoginProps {

}

const Login: FC<LoginProps> = ({}) => {
    const router = useRouter();
    const [,login] = useLoginMutation();
    return (
        <Wrapper>
        <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={
            async (values, { setErrors }) => {
                const response = await login({ usernameOrEmail: values.usernameOrEmail, password: values.password })

                if (response.data.login.errors) {
                    const mappedErrors = toErrorMap(['usernameOrEmail', 'password'], response.data.login.errors)
                    setErrors(mappedErrors)
                } else if (response.data.login.user) {
                    //We got a user
                    console.log(response.data.login.user)
                    router.push("/")
                }
            }
        }
        >
            {({values, handleChange, isSubmitting}) => (
                <Form>
                    <InputField name="usernameOrEmail" label='User Name or Email' placeholder='bobthebuilder'/>
                    <InputField name='password' label='Password' placeholder='password' type='password' />
                    <Button type='submit' mt={4} variant="ghost" isLoading={isSubmitting}>Login</Button>
                    <NextLink href="/forgot-password">
                        <Link>Forgot password?</Link>
                    </NextLink>
            </Form>
            )}
        </Formik>
        </Wrapper>  
    );
}

export default withUrqlClient(createUrqlClient)(Login);