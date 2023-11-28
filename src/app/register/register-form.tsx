'use client';

import { useFormState } from 'react-dom'
import { createUser } from '@/lib/database/mysql'

export default function RegisterForm() {
    const [state, dispatch] = useFormState(createUser, undefined);
    return (
        <main className="flex items-center justify-center">
            <form action={dispatch}>
                <div>
                    <label htmlFor="username" className="block font-medium">Username:</label>
                    <div>
                        <input
                            className="peer block rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                            id="username" name="username" type="text" placeholder="Enter username...">
                        </input>
                    </div>
                </div>

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

                <div>
                    <label htmlFor="password" className="block font-medium">Confirm Password:</label>
                    <div>
                        <input
                            className="peer block rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                            id="confirmPassword" name="confirmPassword" type="password" placeholder="Enter password again...">
                        </input>
                    </div>
                </div>

                <button className="mt-4 w-full bg-sky-500 rounded p-1 text-white" type="submit">Register</button>
            </form>
        </main>
    )
}