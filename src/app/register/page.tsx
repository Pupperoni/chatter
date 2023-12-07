import Link from "next/link"
import { RegisterForm } from "./register-form"

export default function Page() {
    return (
        <main className="flex items-center justify-center">
            <div>
                <div className="my-4 text-xl font-bold">
                    Create an account
                </div>
                <RegisterForm></RegisterForm>
                <div className="mt-4">
                    <Link href='/login'>Login</Link>
                </div>
            </div>
        </main>
    )
}