import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Confirm, Button, Loader } from 'semantic-ui-react';
// import cors from '../api/cors';

const Note = ({ note }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteNote();
        }
    }, [isDeleting])


    const open = () => setConfirm(true)

    const close = () => setConfirm(false)

    const deleteNote = async () => {
        const noteId = router.query.id;
        try {
            const deleted = await fetch(`${process.env.BASE_URL}/api/notes/${noteId}`, {
                method: "DELETE",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            });

            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div className="note-container text-center">
            {isDeleting
                ? <Loader />
                :
                <>
                    <h1>Nama Stok: {note.title}</h1>
                    <p>Sub Total: {note.quantity}kg</p>
                    <p>Tanggal: {note.tanggal}</p>
                    <p>Keterangan: {note.description}</p>
                    <Button color='red' onClick={open}>Delete</Button>
                </>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </div>
    )
}

Note.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`${process.env.BASE_URL}/api/notes/${id}`);
    const { data } = await res.json();

    return { note: data }

}

export default Note;