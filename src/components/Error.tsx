
type ErrorProps = {
    error: string;
    classNames?: string
}

export default function Error({ error, classNames }: ErrorProps) {
    return (
        // <p className="mt-2 text-center">
        <>
            {!!error && (
                <span className={` text-red-400 tracking-wider ${classNames ? classNames : "mb-2 text-sm text-center"}`}>
                    {error}
                </span>
            )}
        </>
        // </p>
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