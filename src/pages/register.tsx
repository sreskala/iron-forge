import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useMutation } from 'urql';
import Wrapper from '../components/Wrapper';
import InputField from '../components/form/InputField';
import { useRegisterMutation } from '../generated/graphql';

interface RegisterProps {

}

const REGISTER_MUTATION = `
mutation Register($registrationInput: UserNamePasswordInput!) {
    register(registrationInput: $registrationInput) {
      id
      userName
      createdAt
      updatedAt
    }
}
`

const Register: FC<RegisterProps> = ({}) => {
    const [register, { data, loading, error }] = useRegisterMutation({
        variables: {
            registrationInput: { username: 'ds', password: 'sd'}
        }
    })
    return (
        <Wrapper>
        <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => register()}
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

export default Register;