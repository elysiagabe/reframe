import { useState } from 'react';

export const useForm = (callback: () => void, initialState = {} as any) => {
    const [formValues, setFormValues] = useState(initialState);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        callback();
    };

    return {
        onChange,
        onSubmit, 
        formValues
    };
};