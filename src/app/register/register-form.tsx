'use client';

import { useFormState } from 'react-dom'
import { createUser } from '@/lib/database/in-memory'
import Link from 'next/link';

export default function RegisterForm() {
    const [state, dispatch] = useFormState(createUser, undefined);
    return (
        <main className="flex items-center justify-center">
            <form action={dispatch}>
                <div>
                    <label htmlFor="username" className="block font-medium text-white-900">Username:</label>
                    <div>
                        <input
                            className="peer block rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                            id="username" name="username" type="text">
                        </input>
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block font-medium text-white-900">Email:</label>
                    <div>
                        <input
                            className="peer block rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                            id="email" name="email" type="text">
                        </input>
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block font-medium text-white-900">Password:</label>
                    <div>
                        <input
                            className="peer block rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                            id="password" name="password" type="password">
                        </input>
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block font-medium text-white-900">Confirm Password:</label>
                    <div>
                        <input
                            className="peer block rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                            id="confirmPassword" name="confirmPassword" type="password">
                        </input>
                    </div>
                </div>

                <button className="mmt-4 w-full bg-sky-500 rounded p-1" type="submit">Register</button>
                <Link href='/login' className="mt-4 w-full">Login</Link>
            </form>
        </main>
    )
}