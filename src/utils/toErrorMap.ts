import { FieldError } from "../generated/graphql";

export const toErrorMap = (availableKeys: string[], errors?: FieldError[]): Record<string, string> | null => {
    if (!errors || !availableKeys) {
        return null;
    }
    const errorsObject = generateErrorsObject(availableKeys);

    for (const error of errors) {
        if (errorsObject.hasOwnProperty(error.field)) {
            errorsObject[error.field] = error.message;
        }
    }

    return errorsObject;
}

const generateErrorsObject = (keys: string[]): {[key: string]: string | undefined} => {
    const errors: Record<string, string> = {};
    for (const key of keys) {
        errors[key] = undefined;
    }

    return errors;
}