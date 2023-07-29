
type LabelProps = {
    text: string;
    id?: string;
    isRequired?: boolean;
}

export default function Label({ text, id, isRequired = false }: LabelProps) {
    return <label
        htmlFor={id}
        className='w-full flex items-center text-xs md:text-md font-bold tracking-wider px-1 text-gray-600'
    >
        <span>{text}</span>
        {isRequired ? (
            <span className='ml-0.5 -my-2 text-base font-bold text-red-400'>
                *
            </span>
        ) : null}
    </label>
    // return (
    //     <label htmlFor={id} className={`block text-sm font-medium text-gray-900 mr-2 ${isRequired ? "after:content-['*'] after:text-red-600" : ""} capitalize`}>{text}</label>
    // )
}
