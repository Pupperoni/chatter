import Link from "next/link"
import { LoginForm } from "./login-form"

export default function Page() {
    return (
        <main className="flex items-center justify-center">
            <div>
                <div className="my-4 text-xl font-bold">
                    Login
                </div>
                <LoginForm></LoginForm>
                <div className="mt-4">
                    <Link href='/register'>Register here</Link>
                </div>
            </div>
        </main>
    )
}