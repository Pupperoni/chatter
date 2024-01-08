'use client';

import { usePathname } from "next/navigation";
import { ChangeEvent, useState } from "react"

export default function Page() {
    const pathName = usePathname();
    const splitPathName = pathName.split('/');
    const id = splitPathName[splitPathName.length - 1];
    
    const [inputValue, setInputValue] = useState('');
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputValue(value);
    };

    function handleClickSend() {
        try {
            setInputValue('');
            console.log('submitting text:', inputValue);
        } catch (error: any) {
            // set error
        }
    }
    // TODO: move as another component
    return (
        <main>
            <div className="w-full">
                <div className="flex items-center">
                    <input
                        className="block rounded-md border border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500 rounded-e-none"
                        id="message-input" type="text" placeholder="Type here..."
                        value={inputValue} onChange={handleChange}>
                    </input>
                    <button className="flex-shrink-0 bg-sky-500 rounded-md p-2 text-white rounded-s-none" onClick={handleClickSend}>Send</button>
                </div>
            </div>
        </main>
    )
}