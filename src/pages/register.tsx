import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import InputField from '../components/form/InputField';

interface RegisterProps {

}

const Register: FC<RegisterProps> = ({}) => {
    return (
        <Wrapper>
        <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => console.log(values)}
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