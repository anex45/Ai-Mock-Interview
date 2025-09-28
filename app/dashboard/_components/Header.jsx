"use client";
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

function Header() {
    const path = usePathname();
    const router = useRouter();

    useEffect(() => {
        console.log(path);
    }, [path]);

    function getRoutLink(path) {
        router.push(path);
    }

    return (
        <header className='flex p-4 items-center justify-between bg-gradient-to-r from-gray-800 to-black shadow-lg max-w-full overflow-hidden'>
            <Image
                src={'/logo.svg'}
                width={120}
                height={40}
                alt='AI Interview Logo'
                className='hover:opacity-90 transition-opacity cursor-pointer'
                style={{ height: '40px', width: 'auto' }}
                onClick={() => getRoutLink('/')}
            />
            <nav>
                <ul className='hidden md:flex gap-8 text-white'>
                    <li
                        onClick={() => getRoutLink('/dashboard')}
                        className={`hover:text-indigo-500 hover:font-semibold transition-all cursor-pointer ${path === '/dashboard' && 'text-indigo-500 font-bold'}`}
                    >
                        Dashboard
                    </li>
                    <li
                        onClick={() => getRoutLink('/dashboard/questions')}
                        className={`hover:text-indigo-500 hover:font-semibold transition-all cursor-pointer ${path === '/dashboard/questions' && 'text-indigo-500 font-bold'}`}
                    >
                        Questions
                    </li>
                    <li
                        onClick={() => getRoutLink('/dashboard/upgrade')}
                        className={`hover:text-indigo-500 hover:font-semibold transition-all cursor-pointer ${path === '/dashboard/upgrade' && 'text-indigo-500 font-bold'}`}
                    >
                        Upgrade
                    </li>
                    <li
                        onClick={() => getRoutLink('/dashboard/how')}
                        className={`hover:text-indigo-500 hover:font-semibold transition-all cursor-pointer ${path === '/dashboard/how' && 'text-indigo-500 font-bold'}`}
                    >
                        How it works?
                    </li>
                </ul>
            </nav>
            <UserButton />
        </header>
    );
}

export default Header;
