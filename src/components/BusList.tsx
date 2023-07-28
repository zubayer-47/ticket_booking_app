import { useContext, useMemo, useState } from 'react';
import { FiLayout } from 'react-icons/fi';
import { Context } from '../contexts/Context';
import { makeCoachName } from '../utils/coachName';
import TicketModal from './ModalViews/TicketModal';

function BusList() {
	const [showModal, setShowModal] = useState(false);
	const [prodID, setProdID] = useState('');
	const { state } = useContext(Context)

	const sanitizeProductList = useMemo(() => state.searchProds.list.filter(prod => {
		if (prod.From.length > 0) {
			const index = prod.From.findIndex(f => f.location.id === state.searchProds.fromID);

			if (index !== -1) {
				const deletedProdFrom = prod.From.splice(index, 1);

				prod.From.splice(0, 0, deletedProdFrom[0]);
				return prod.From;
			}

			return prod
		}
	}), [state.searchProds.fromID, state.searchProds.list])

	const handleView = (prodID: string) => {
		setShowModal(true);

		setProdID(prodID)
	};

	return (
		<div className='mt-8'>
			<h1 className='text-3xl tracking-wide my-2'>Available Buses</h1>
			<div className='overflow-auto'>
				<table className='text-center shadow-md w-full border-collapse border border-gray-100'>
					<thead className='w-full'>
						<tr className=' bg-emerald-500 text-white flex items-center'>
							<th className='py-1.5 flex-1 flex-shrink-0'>Bus Name</th>
							<th className='py-1.5 flex-1 flex-shrink-0'>Coach No</th>
							<th className='py-1.5 flex-1 flex-shrink-0'>Starting Counter</th>
							<th className='py-1.5 flex-1 flex-shrink-0'>End Counter</th>
							<th className='py-1.5 flex-1 flex-shrink-0'>Fare</th>
							<th className='py-1.5 flex-1 flex-shrink-0'>Coach Type</th>
							<th className='py-1.5 flex-1 flex-shrink-0'>Seats Available</th>
							<th className='py-1.5 flex-1 flex-shrink-0'>View</th>
						</tr>
					</thead>
					<tbody className='w-full'>
						{!sanitizeProductList.length ? (<tr><td>No Bus Exist on That day</td></tr>) : sanitizeProductList.map((prod) => (
							<tr className='flex items-center border' key={prod.id}>
								<td className='py-1 px-2 flex-1 flex-shrink-0'>{prod.brand.name}</td>
								<td className='py-1 px-2 flex-1 flex-shrink-0'>{makeCoachName(prod.id, prod.brand.name)}</td>
								<td className='py-1 px-2 flex-1 flex-shrink-0'>
									{prod.From[0].location?.name}
								</td>
								<td className='py-1 px-2 flex-1 flex-shrink-0'>
									{prod.location.name}
								</td>
								<td className='py-1 px-2 flex-1 flex-shrink-0'>{prod.From[0].ticket_price}</td>
								<td className='py-1 px-2 flex-1 flex-shrink-0'>
									{prod.type}
								</td>
								<td className='py-1 px-2 flex-1 flex-shrink-0'>
									{/* {prod.} */} 12
								</td>
								<td className='py-1 px-2 flex-1 flex-shrink-0'>
									<button onClick={() => handleView(prod.id)}>
										<FiLayout className='w-6 h-6 text-emerald-500' />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{!showModal ? null : (
					<TicketModal showModal={showModal} setShowModal={setShowModal} prodID={prodID} />
				)}
			</div>
		</div>
	);
}

export default BusList