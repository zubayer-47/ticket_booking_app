
import AsyncSelect from 'react-select/async';
import { api } from '../../utils/axios';

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

type DataType = { id: string; name: string }

const fetchData = async (): Promise<DataType[]> => {
    const data = []
    try {
        const res: { data: { location: DataType[] } } = await api.get('/search/fromLocation')

        data.push(...res.data.location)
    } catch (error) {
        console.log(error, 'from asyncSelect')
    }

    console.log(data)

    return data
}

const promiseOptions = () =>
    new Promise<DataType[]>((resolve) => {
        setTimeout(() => {
            resolve(fetchData());
        }, 1000);
    });

// fetch here
// console.log(inputValue)
// eslint-disable-next-line @typescript-eslint/no-explicit-any

export default function Select({ name }: { name: string }) {

    return <AsyncSelect
        autoFocus
        onChange={(value) => console.log(value)}
        className='w-full' styles={{
            menu: provided => ({ ...provided, zIndex: 20 })
        }}
        cacheOptions
        name={name}
        defaultOptions
        loadOptions={promiseOptions}
    />

}