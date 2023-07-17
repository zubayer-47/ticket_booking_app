type PageLayoutProps = {
    children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
    return (
        <div className='h-screen max-w-full md:max-w-2xl lg:max-w-4xl mx-2 md:mx-auto xl:max-w-5xl'>
            {children}
        </div>
    )
}
