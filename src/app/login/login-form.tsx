'use client';

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export function LoginForm() {
    const router = useRouter();
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/home';

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setFormValues({ email: '', password: '' });
            const res = await signIn('credentials', {
                redirect: false,
                email: formValues.email,
                password: formValues.password,
                callbackUrl,
            });

            if (!res?.error) {
                router.push(callbackUrl);
            } else {
                // set error
            }
        } catch (error: any) {
            // set errors
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }
    return (
        <main className="flex items-center justify-center">
            <form onSubmit={onSubmit}>
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

                <button className="mt-4 w-full bg-sky-500 rounded p-1 text-white" type="submit">Login</button>
            </form>
        </main>
    )
}