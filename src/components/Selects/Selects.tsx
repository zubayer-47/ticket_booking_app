import Label from "../Inputs/Label";

export function Gender() {
    return (
        <>
            <Label text="Gender" id="gender" isRequired />
            <select name='gender' className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required value='' onChange={() => undefined}>
                <option >Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
            </select>
        </>
    )
}
