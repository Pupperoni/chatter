'use client';

import { useFormState } from 'react-dom'
import { authenticate } from '@/lib/database/mysql'

export default function LoginForm() {
    const [state, dispatch] = useFormState(authenticate, undefined);
    return (
        <main className="flex items-center justify-center">
            <form action={dispatch}>
                <div>
                    <label htmlFor="email" className="block font-medium">Email address:</label>
                    <div>
                        <input
                            className="peer block rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                            id="email" name="email" type="text" placeholder="Enter email address...">
                        </input>
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block font-medium">Password:</label>
                    <div>
                        <input
                            className="peer block rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                            id="password" name="password" type="password" placeholder="Enter password...">
                        </input>
                    </div>
                </div>

                <button className="mt-4 w-full bg-sky-500 rounded p-1 text-white" type="submit">Login</button>
            </form>
        </main>
    )
}