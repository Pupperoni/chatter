import { signOut } from "@/auth";

export default function Page() {
    async function logout() {
        'use server';
        await signOut();
    }
    return (
        <main>
            <div className="flex">
                Welcome, logged in user!
            </div>
            <div className="block">
                <form action={logout}>
                    <button className="rounded p-1 bg-blue-400 w-100">Logout</button>
                </form>
            </div>
        </main>
    )
}