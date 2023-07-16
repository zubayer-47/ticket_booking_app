import { ReactNode } from 'react';
import Select from '../common/Select';
// import { InputType } from '../../types/custom'

type InputProps = { type?: string, svg?: ReactNode, name?: string; }

export default function Input({ type, svg, name = '' }: InputProps) {
    // const [text, setText] = useState('')

    // const handleChange = (e: InputType) => {
    //     setText(e.target.value)
    // }

    return (
        type !== 'date'
            ?
            <div className='relative flex justify-start items-center'>
                {/* {svg} */}

                <Select />
            </div>
            :
            <input type="date" className='w-full border outline-none rounded-md p-1.5' name="date" id="date" />
    )
}
