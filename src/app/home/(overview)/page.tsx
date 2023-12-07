'use client';

import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session, status} = useSession();
    // console.log('client session', session);
    let user = session?.user;

    return (
        <main>
            {(user) ? (
                <div className="flex">
                    Welcome, { user.name }!
                </div>
            ) : (
                <div className="flex">
                    Welcome, guest!
                </div>
            )}
        </main>
    )
}