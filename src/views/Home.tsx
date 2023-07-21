import { Outlet } from 'react-router-dom';
import Booking from '../components/Booking';
import CenterLayout from '../components/Layouts/CenterLayout';
import PageLayout from '../components/Layouts/PageLayout';

export default function Home() {
	return (
		<PageLayout>
			<CenterLayout noWidth>
				<Booking />
			</CenterLayout>
			<Outlet />
		</PageLayout>
	);
}
