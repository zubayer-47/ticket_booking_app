import { Suspense, lazy } from "react";
import CenterLayout from "../../components/Layouts/CenterLayout";

const BrandList = lazy(() => import('./BrandList'));

export default function AllBrands() {
    return (
        <div>
            <CenterLayout>
                <Suspense fallback={<Loading />}>
                    <BrandList />
                </Suspense>
            </CenterLayout>
        </div>
    )
}

function Loading() {

    return <h1>Loading...</h1>
}
