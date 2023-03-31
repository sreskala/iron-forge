import React from 'react';
import { NextPage } from 'next';
import { Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import InputField from '../../components/form/InputField';
import Wrapper from '../../components/Wrapper';
import { toErrorMap } from '../../utils/toErrorMap';
import login from '../login';
import { useChangePasswordMutation } from '../../generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';


const ChangePassword: NextPage<{token: string}> = ({ token }) => {
    const [{ fetching },changePassword] = useChangePasswordMutation();
    const router = useRouter();
    return(
        <Wrapper>
        <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={
            async (values, { setErrors }) => {
                const response = await changePassword({ token, newPassword: values.newPassword })

                if (response.data?.changePassword?.errors) {
                    const mappedErrors = toErrorMap(['newPassword'], response.data?.changePassword?.errors)
                    setErrors(mappedErrors)
                } else if (response.data?.changePassword?.user) {
                    //We got a user
                    router.push("/")
                }
            }
        }
        >
            {({values, handleChange, isSubmitting}) => (
                <Form>
                    <InputField name="newPassword" label='New Password' placeholder='New password' type="password" />
                    <InputField name='confirmPassword' label='Confirm New Password' placeholder='New password' type='password' />
                    <Button type='submit' mt={4} variant="ghost" isLoading={isSubmitting || fetching }>Change Password</Button>
                {/* <FormControl>
                    <FormLabel htmlFor='username'>Username</FormLabel>
                    <Input id="username" placeholder='user name' value={values.username} onChange={handleChange}/>
                </FormControl> */}
            </Form>
            )}
        </Formik>
        </Wrapper>  
    )
};

ChangePassword.getInitialProps = ({ query }) => {
    return {
        token: query.token as string
    }
}

export default withUrqlClient(createUrqlClient)(ChangePassword);