import { ChangeEvent, ReactNode, useState } from 'react'

type InputProps = { id: string, type?: string, svg?: ReactNode }

export default function Input({ id, type, svg }: InputProps) {
    const [text, setText] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    return (
        type !== 'date'
            ?
            <div className='relative flex justify-start items-center'>
                {svg}
                <input type="text" name={id} className='w-full outline-none rounded-md p-2 border' id={id} value={text} onChange={handleChange} />
            </div>
            :
            <input type="date" className='w-full border outline-none rounded-md p-2' name="date" id="date" />
    )
}
