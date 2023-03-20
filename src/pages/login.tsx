import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useMutation } from 'urql';
import Wrapper from '../components/Wrapper';
import InputField from '../components/form/InputField';
import { useLoginMutation, useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

interface LoginProps {

}

const Login: FC<LoginProps> = ({}) => {
    const router = useRouter();
    const [,login] = useLoginMutation();
    return (
        <Wrapper>
        <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={
            async (values, { setErrors }) => {
                const response = await login({loginInput: { username: values.username, password: values.password }})

                if (response.data.login.errors) {
                    const mappedErrors = toErrorMap(['username', 'password'], response.data.login.errors)
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
                    <InputField name="username" label='User Name' placeholder='bobthebuilder'/>
                    <InputField name='password' label='Password' placeholder='password' type='password' />
                    <Button type='submit' mt={4} variant="ghost" isLoading={isSubmitting}>Login</Button>
                {/* <FormControl>
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <Input id="username" placeholder='user name' value={values.username} onChange={handleChange}/>
                </FormControl> */}
            </Form>
            )}
        </Formik>
        </Wrapper>  
    );
}

export default Login;