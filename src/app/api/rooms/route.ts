import { authOptions } from "@/lib/auth";
import { createRoom } from "@/lib/database/mysql";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const user: any = session?.user;

        if(!user) {
            throw Error('No user session');
        }
    
        const data = (await req.json()) as {
            roomName: string;
        };

        const room = await createRoom(user.id, data.roomName);

        console.log('new room', room);
        return NextResponse.json({
            room: room
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