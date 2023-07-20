
type ModalBoxProps = { children: React.ReactNode, onClose?: () => void }

export default function ModalBox({ children, onClose }: ModalBoxProps) {
    return (
        <>
            <div
                className="flex justify-center items-center overflow-y-auto fixed inset-0 outline-none z-20 focus:outline-none mx-5"
            >
                <button type="button" onClick={onClose} className="fixed inset-0 bg-black/25"></button>
                <div className="relative my-6 mx-auto">
                    {children}
                </div>
            </div>

        </>
    )
}
