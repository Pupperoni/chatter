import { useSession } from "next-auth/react";
import { CreateRoomForm } from "./create-room-form";
import { redirect } from "next/navigation";

export default function Page() {

    return (
        <main className="flex items-center justify-center">
            <div>
                <div className="my-4 text-xl font-bold">
                    Create a room
                </div>
                <CreateRoomForm ></CreateRoomForm>
            </div>
        </main>
    )
}