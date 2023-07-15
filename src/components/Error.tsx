
type ErrorProps = {
    error: string;
}

export default function Error({ error }: ErrorProps) {
    return (
        <p className="mt-2 text-center">
            {!!error && (
                <span className='mb-2 text-sm text-center text-red-400 tracking-wider'>
                    {error}
                </span>
            )}
        </p>
    )
}

type InputErrorProps = {
    error: string;
}

export function InputError({ error }: InputErrorProps) {
    return (
        <>
            {!!error && (
                <span className='text-sm text-red-400 tracking-wider'>
                    {error}
                </span>
            )}
        </>
    )
}