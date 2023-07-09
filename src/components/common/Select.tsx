
import AsyncSelect from 'react-select/async';

const colorOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const filterColors = (inputValue: string) => {
    return colorOptions.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const promiseOptions = (inputValue: string) =>
    // fetch here
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new Promise<Record<string, any>[]>((resolve) => {
        setTimeout(() => {
            resolve(filterColors(inputValue));
        }, 1000);
    });

export default function Select() {

    return <AsyncSelect className='w-full' styles={{
        menu: provided => ({ ...provided, zIndex: 20 })
    }} cacheOptions defaultOptions loadOptions={promiseOptions} />
}