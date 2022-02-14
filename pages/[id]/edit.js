
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const EditNote = ({ note }) => {
    const [form, setForm] = useState({ title: note.title, quantity: note.quantity, description: note.description });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateNote();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const updateNote = async () => {
        try {
            const res = await fetch(`https://stok-build.herokuapp.com/api/notes/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: form.title, quantity: form.quantity + parseInt(quantity), tanggal: form.tanggal, description: form.description })
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
            <h1>Update Note</h1>
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
                                value={form.title}
                                onChange={handleChange}
                            />
                            <Form.Input
                                // fluid
                                type='Number'
                                error={errors.quantity ? { content: 'Please enter quantity', pointing: 'below' } : null}
                                label='Quantity'
                                placeholder='Quantity'
                                name='quantity'
                                onChange={(e) => { setQuantity(e.target.value) }}
                            />
                            <Form.Input
                                // fluid
                                type='Date'
                                error={errors.quantity ? { content: 'Please enter quantity', pointing: 'below' } : null}
                                label='Date'
                                placeholder='Date'
                                name='tanggal'
                                onChange={handleChange}
                            />

                            <Form.TextArea
                                // fluid={value.toString()}
                                error={errors.title ? { content: 'Please enter description', pointing: 'below' } : null}
                                label='Description'
                                placeholder='Description'
                                name='description'
                                value={form.description}
                                onChange={handleChange}
                            />
                            <Button type='submit'>Update</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

EditNote.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);
    const { data } = await res.json();

    return { note: data }
}

export default EditNote;