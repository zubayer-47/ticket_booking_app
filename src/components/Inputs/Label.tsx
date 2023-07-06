
type LabelProps = {
    text: string;
    id?: string;
    isRequired?: boolean;
}

export default function Label({ text, id, isRequired = false }: LabelProps) {
    return (
        <label htmlFor={id} className={`block text-sm font-medium text-gray-900 mr-2 ${isRequired ? "after:content-['*'] after:text-red-600" : ""} capitalize`}>{text}:</label>
    )
}
