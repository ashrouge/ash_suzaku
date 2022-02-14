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
    // <div className="h-screen font-sans" style={{ backgroundImage: "url(./images/1.jpeg)" }}>
    //   <div className="container mx-auto h-full flex justify-center items-center">
    //     <div className="">
    //       <div className="border-teal bg-white p-8 mb-6 rounded-lg">
    //         <h1 className="font-hairline mb-4 text-center text-2xl font-bold">
    //           Login
    //         </h1>
    //         <div className="mb-4 form control w-96">
    //           <label className="font-bold block mb-2 label">
    //             <span className="label-text">Email</span>
    //           </label>
    //           <input
    //             type="text"
    //             placeholder="Email"
    //             className="input input-accent input-bordered w-full"
    //           />
    //         </div>
    //         <div className="mb-2 form control w-96">
    //           <label className="font-bold block mb-2 label">
    //             <span className="label-text">Password</span>
    //           </label>
    //           <input
    //             type="text"
    //             placeholder="Your Password"
    //             className="input input-accent input-bordered w-full"
    //           />
    //         </div>
    //         <p className="flex justify-start text-lit mb-4">
    //           Don't have an account?{" "}
    //           <a href="#" className="text-gray-700 underline mr-2">
    //             Create an Account
    //           </a>
    //           .
    //         </p>
    //         <div className="flex justify-center">
    //           <button className="flex justify-center btn w-48 h-2 rounded-2xl">
    //             Login
    //           </button>
    //         </div>
    //       </div>
    //       <div></div>
    //     </div>
    //   </div>
    // </div>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch('https://stok-build.herokuapp.com/api/notes');
  const { data } = await res.json();

  return { notes: { data } }
}

export default Index;