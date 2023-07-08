type PageLayoutProps = {
    children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
    return (
        <div className='max-h-full max-w-full md:max-w-2xl lg:max-w-4xl mx-2 md:mx-auto xl:max-w-5xl'>
            <div className='min-w-full md:mx-0 sm:w-3/5 md:max-w-md lg:max-w-lg p-4 bg-white rounded-xl shadow-md'>
                {children}
            </div>
        </div>
    )
}
