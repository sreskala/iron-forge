import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useMutation } from 'urql';
import Wrapper from '../components/Wrapper';
import InputField from '../components/form/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import Navbar from '../components/Navbar';
import { createUrqlClient } from '../utils/createUrqlClient';

interface RegisterProps {

}

const Register: FC<RegisterProps> = ({}) => {
    const router = useRouter();
    const [_,register] = useRegisterMutation()
    return (
        <Wrapper>
        <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={
            async (values, { setErrors }) => {
                const response = await register({registrationInput: { username: values.username, password: values.password }})

                if (response.data.register.errors) {
                    const mappedErrors = toErrorMap(['username', 'password'], response.data.register.errors)
                    setErrors(mappedErrors)
                } else if (response.data.register.user) {
                    //We got a user
                    router.push("/")
                }
            }
        }
        >
            {({values, handleChange, isSubmitting}) => (
                <Form>
                    <InputField name="username" label='User Name' placeholder='bobthebuilder'/>
                    <InputField name='password' label='Password' placeholder='password' type='password' />
                    <Button type='submit' mt={4} variant="ghost" isLoading={isSubmitting}>Register</Button>
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

export default withUrqlClient(createUrqlClient)(Register);