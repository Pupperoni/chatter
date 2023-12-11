import { NextResponse } from "next/server";
import { createUser } from '@/lib/database/mysql'

export async function POST(req: Request) {
    try {
        const data = (await req.json()) as {
            username: string;
            email: string;
            password: string;
        };

        const user = await createUser(data.username, data.email, data.password);

        return NextResponse.json({
            user: {
                name: user.username,
                email: user.email,
            },
        });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}
