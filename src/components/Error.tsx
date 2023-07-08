
type ErrorProps = {
    emptyField: string;
}

export default function Error({ emptyField }: ErrorProps) {
    return (
        <p className="mt-2">
            {!!emptyField && (
                <p className='mb-2 text-sm text-center text-red-400 tracking-wider'>
                    {emptyField}
                </p>
            )}
        </p>
    )
}
