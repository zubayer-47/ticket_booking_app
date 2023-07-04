import { ReactNode } from 'react'
import Select from '../common/Select'
// import { InputType } from '../../types/custom'

type InputProps = { type?: string, svg?: ReactNode }

export default function Input({ type, svg }: InputProps) {
    // const [text, setText] = useState('')

    // const handleChange = (e: InputType) => {
    //     setText(e.target.value)
    // }

    return (
        type !== 'date'
            ?
            <div className='relative flex justify-start items-center'>
                {svg}

                <Select />
            </div>
            :
            <div className='flex justify-center items-center gap-2'>
                <input type="date" className='w-full border outline-none rounded-md p-2' name="date" id="date" />

                <select className='w-full bg-white p-2 rounded-md outline-none border-2' name="" id="">
                    <option>---</option>
                    <option value="AC">AC</option>
                    <option value="NON-AC">NON-AC</option>
                </select>
            </div>
    )
}
