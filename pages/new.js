import Link from 'next/link';
import { useState, useEffect, createContext } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const NewNote = () => {
    const [form, setForm] = useState({ title: '', quantity: '', description: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createNote();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const createNote = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/notes', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const validate = () => {
        let err = {};

        if (!form.title) {
            err.title = 'Title is required';
        }
        if (!form.quantity) {
            err.quantity = 'Quantity is required';
        }
        if (!form.description) {
            err.description = 'Description is required';
        }

        return err;
    };


    return (
        <div className="form-container w-96 my-5 mx-auto">
            <h1>Create Note</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                // fluid={value.toString()}
                                error={errors.title ? { content: 'Please enter title', pointing: 'below' } : null}
                                label='Title'
                                placeholder='Title'
                                name='title'
                                onChange={handleChange}
                            />
                            <Form.Input
                                // fluid
                                type='Number'
                                error={errors.quantity ? { content: 'Please enter quantity', pointing: 'below' } : null}
                                label='Quantity'
                                placeholder='Quantity'
                                name='quantity'
                                onChange={handleChange}
                            />
                            <Form.Input
                                type='Date'
                                error={errors.tanggal ? { content: 'Please enter date', pointing: 'below' } : null}
                                label='Date'
                                // placeholder=''
                                name='tanggal'
                                onChange={handleChange}

                            />
                            <Form.TextArea
                                // fluid={value.toString()}
                                error={errors.title ? { content: 'Please enter description', pointing: 'below' } : null}
                                label='Description'
                                placeholder='Description'
                                name='description'
                                onChange={handleChange}
                            />
                            <Button type='submit'>Create</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

export default NewNote;