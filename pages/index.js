// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card } from 'semantic-ui-react';
// import Note from '../models/Note';

const Index = ({ notes }) => {
  return (
    <div className="notes-container">
      <h1 className='text-center'>Notes</h1>
      <div className="grid wrapper max-w-screen-xl px-4 m-auto grid-cols-3 gap-2">
        {notes.data.map(note => {
          return (
            <div key={note._id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${note.id}`}>
                      <a>{note.title}</a>
                    </Link>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${note._id}`}>
                    <Button primary>View</Button>
                  </Link>
                  <Link href={`/${note._id}/edit`}>
                    <Button primary>Edit</Button>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/notes`);
  const { data } = await res.json();

  return { notes: { data } }
}

export default Index;