
type ErrorProps = {
    error: string;
}

export default function Error({ error }: ErrorProps) {
    return (
        <p className="mt-2">
            {!!error && (
                <p className='mb-2 text-sm text-center text-red-400 tracking-wider'>
                    {error}
                </p>
            )}
        </p>
    )
}


type InputErrorProps = {
    error: string;
}

export function InputError({ error }: InputErrorProps) {
    return (
        <p className="">
            {!!error && (
                <span className='text-sm text-red-400 tracking-wider'>
                    {error}
                </span>
            )}
        </p>
    )
}