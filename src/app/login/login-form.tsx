'use client';

import { useFormState } from 'react-dom'
import { authenticate } from '@/lib/database/in-memory'
import Link from 'next/link';

export default function LoginForm() {
    const [state, dispatch] = useFormState(authenticate, undefined);
    return (
        <main className="flex items-center justify-center">
            <form action={dispatch}>
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

                <button className="mt-4 w-full bg-sky-500 rounded p-1" type="submit">Login</button>
                <Link href='/register' className="mt-4 w-full">Register here</Link>
            </form>

        </main>
    )
}