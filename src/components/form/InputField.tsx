import React, { FC, InputHTMLAttributes} from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
};

export const InputField: FC<InputFieldProps> = ({label, size: _, ...props}) => {
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input id={field.name} {...field} {...props}/>
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null }
        </FormControl>
    );
};

export default InputField;