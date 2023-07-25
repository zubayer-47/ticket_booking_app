import { Outlet, Route, Routes } from 'react-router-dom';
import Booking from './components/Booking';
import { MainLayout } from './components/Layouts/Layout';
import Navbar from './components/Navbar';
import AdminProtected from './components/protected/AdminProtected';
import Protected from './components/protected/Protected';
import NotFound from './views/NotFound';
import Dashboard from './views/admin/Dashboard';
import AllBrands from './views/admin/brand/AllBrands';
import CreateProduct from './views/admin/product';
import BrandWiseProduct from './views/admin/product/BrandWiseProduct';
import SignIn from './views/auth/SignIn';
import SignUp from './views/auth/SignUp';
import OrderHistory from './views/orderHistory/OrderHistory';
import Profile from './views/profile/Profile';

export default function App() {
	// const { state } = useContext(Context)

	// useEffect(() => {
	//   console.log(state)

	// }, [state])

	return (
		// <Loader>
		<MainLayout>
			<Navbar />
			<div className='w-full mt-10' />
			<Routes>
				<Route path='/' element={<Outlet />}>
					<Route index element={<Booking />} />

					<Route path='sign-in' element={<SignIn />} />
					<Route path='sign-up' element={<SignUp />} />

					{/* private routes */}
					<Route element={<Protected />}>
						<Route index path='profile' element={<Profile />} />
						<Route path='order-history' element={<OrderHistory />} />
					</Route>

					{/* admin panel private routes */}
					<Route element={<AdminProtected />}>
						<Route index path='dashboard' element={<Dashboard />} />
						<Route path='brands' element={<AllBrands />} />
						<Route path='brands/:brandID' element={<BrandWiseProduct />} />
						<Route path='product' element={<CreateProduct />} />
					</Route>
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</MainLayout>
		// </Loader>
	);
}

// error boundary
// authority bio in allBrands -> getting admin specific brands
