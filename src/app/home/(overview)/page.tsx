'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Page() {
    const { data: session, status} = useSession();
    // console.log('client session', session);
    let user = session?.user;

    return (
        <main>
            <div className="mb-3">
                {(user) ? (
                    <div className="flex">
                        Welcome, { user.name }!
                    </div>
                ) : (
                    <div className="flex">
                        Welcome, guest!
                    </div>
                )}
            </div>

            <div className="mb-3">
                <Link href="/rooms/create" className="mt-4 bg-sky-500 rounded p-2 text-white">Create new room</Link>
            </div>
        </main>
    )
}