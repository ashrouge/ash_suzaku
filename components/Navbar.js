import Link from 'next/link';

const Navbar = () => (
    <nav className='navbar justify-between bg-sky-400 px-10 mb-5'>
        <Link href="/">
            <a className='text-white font-bold text-2xl'>Note App</a>
        </Link>
        <Link href="/new">
            <a className='text-white font-bold text-2xl'>Create note</a>
        </Link>
    </nav>
)

export default Navbar;