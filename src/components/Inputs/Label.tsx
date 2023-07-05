
type LabelProps = {
    text: string;
    isRequired?: boolean;
}

export default function Label({ text, isRequired = false }: LabelProps) {
    return (
        <label htmlFor={text} className={`block text-sm font-medium text-gray-900 mr-2 ${isRequired ? "after:content-['*'] after:text-red-600" : ""} capitalize`}>{text}:</label>
    )
}
