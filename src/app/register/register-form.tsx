'use client';

import { signIn } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';

export function RegisterForm() {
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formValues.password !== formValues.confirmPassword) {
            console.log('Passwords do not match.');
            // set error
            return;
        }
        setFormValues({ username: '', email: '', password: '', confirmPassword: '' });
    
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify({
                    username: formValues.username,
                    email: formValues.email,
                    password: formValues.password
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                // set error
                return;
            }

            signIn(undefined, { callbackUrl: "/" });
        } catch (error: any) {
            // set error
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <main className="flex items-center justify-center">
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username" className="block font-medium">Username:</label>
                    <div>
                        <input
                            className="peer block rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                            id="username" name="username" type="text" placeholder="Enter username..." required
                            value={formValues.username} onChange={handleChange}>
                        </input>
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block font-medium">Email address:</label>
                    <div>
                        <input
                            className="peer block rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                            id="email" name="email" type="text" placeholder="Enter email address..." required
                            value={formValues.email} onChange={handleChange}>
                        </input>
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block font-medium">Password:</label>
                    <div>
                        <input
                            className="peer block rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                            id="password" name="password" type="password" placeholder="Enter password..." required
                            value={formValues.password} onChange={handleChange}>
                        </input>
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block font-medium">Confirm Password:</label>
                    <div>
                        <input
                            className="peer block rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                            id="confirmPassword" name="confirmPassword" type="password" placeholder="Enter password again..." required
                            value={formValues.confirmPassword} onChange={handleChange}>
                        </input>
                    </div>
                </div>

                <button className="mt-4 w-full bg-sky-500 rounded p-1 text-white" type="submit">Register</button>
            </form>
        </main>
    )
}