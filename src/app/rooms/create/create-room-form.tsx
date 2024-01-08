'use client';

import { useRouter  } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

export function CreateRoomForm() {
    const router = useRouter();
    const [formValues, setFormValues] = useState({
        roomName: ''
    })
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormValues({ roomName: '' });
    
        try {
            const res = await fetch("/api/rooms", {
                method: "POST",
                body: JSON.stringify({
                    roomName: formValues.roomName
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const newRoom = await res.json();

            if (!res.ok) {
                // set error
                return;
            }

            // TODO: redirect to the new room
            router.push(`/rooms/${newRoom.id}`)

        } catch (error: any) {
            // set error
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <main className="flex items-center justify-center">
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="roomName" className="block font-medium">Room Name:</label>
                    <div>
                        <input
                            className="peer block rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                            id="roomName" name="roomName" type="text" placeholder="Enter room name..." required
                            value={formValues.roomName} onChange={handleChange}>
                        </input>
                    </div>
                </div>

                <button className="mt-4 w-full bg-sky-500 rounded p-1 text-white" type="submit">Submit</button>
            </form>
        </main>
    )
}