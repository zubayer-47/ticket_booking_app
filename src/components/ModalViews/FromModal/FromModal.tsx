import { FiTrash2 } from 'react-icons/fi';
import { FormType, InputSelectChangeType } from '../../../types/custom';
import { IdNameBrandLocationFromType } from '../../../types/state.types';
import { FromStateType } from '../../../views/admin/product';
import { BgNoneButton, SubmitButton } from '../../Buttons/Button';
import CommonInput from '../../Inputs/CommonInput';
import CommonSelect from '../../Selects/CommonSelect';
import ModalBox from '../ModalBox';

type FromModalProps = {
    froms: FromStateType[],
    locations: IdNameBrandLocationFromType[],
    showModal: boolean;
    setShowModal: (isShow: boolean) => void;
    deleteFromLocations(prodID: string): void
    handleChange(e: InputSelectChangeType, fromID: string): void;
    createFromLocations(): void;
    setFroms(froms: FromStateType[]): void;
}

export default function FromModal({ froms, locations, setShowModal, deleteFromLocations, handleChange, createFromLocations, setFroms }: FromModalProps) {

    // const filteredList = locations.list.filter(
    //     (l) => !froms.map((f) => f.location).includes(l.id)
    // );

    // const handleCreateFroms = async () => {
    //     try {
    //         console.log(froms)
    //     } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //             const message = error.response?.data?.message;
    //             return;
    //         }
    //     }
    // }

    const onSubmit = (e: FormType) => {
        e.preventDefault();


    }

    return (
        <ModalBox onClose={() => {
            setShowModal(false)
            setFroms([])
        }}>
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-50 outline-none focus:outline-none overflow-hidden">
                <div className="relative p-6 max-h-[600px] overflow-auto ">
                    <BgNoneButton
                        text='Add From Locations'
                        handler={createFromLocations}
                        classNames='border border-emerald-600 px-5 text-emerald-600 mb-2'
                    />
                    <form className='flex flex-col' onSubmit={onSubmit}>
                        {froms.map((from) => {
                            // console.log('from.location :', from.location);
                            return (
                                <div key={from.id} className='flex items-center gap-2'>
                                    <CommonSelect
                                        defSelectName='Choose Location'
                                        label='From Locations'
                                        name='from-loc'
                                        options={locations}
                                        change={(e) => {
                                            handleChange(e, from.id);
                                        }}
                                        value={from.location}
                                        classNames='flex-1'
                                        selectClasses='bg-white'
                                        required
                                    />

                                    <CommonInput
                                        label='Ticket Price'
                                        type='number'
                                        name='price'
                                        minMax={[0, 2000]}
                                        change={(e) => {
                                            handleChange(e, from.id);
                                        }}
                                        value={from.price}
                                        placeholder='Ticket Price'
                                        classNames='flex-1'
                                        required
                                    />

                                    <div className='flex items-stretch gap-1 mt-2'>
                                        <button
                                            onClick={() => deleteFromLocations(from.id)}
                                            type='button'
                                            className='p-2 rounded-md bg-red-500/25'
                                        >
                                            <FiTrash2 className='h-5 w-5 text-red-400' />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                        <SubmitButton
                            text='Create Froms'
                        />
                    </form>

                </div>
            </div>
        </ModalBox>
    )
}
