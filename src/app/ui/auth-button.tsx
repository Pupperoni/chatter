import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function AuthButton() {
    const {data: session} = useSession();
    const user = session?.user;

    return (
        <>
            {(user) ? (
            <>
                <button onClick={() => {
                    signOut();
                }} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    Logout
                </button>
            </>
            ) : (
            <>
                <Link href="/login" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    Login
                </Link>
                <Link href="/register" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                    Register
                </Link>
            </>
            )}
        </>
    )
}