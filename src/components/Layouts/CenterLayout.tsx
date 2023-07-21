import React, { ReactNode } from 'react';

type PropType = {
	children: ReactNode;
	noWidth?: boolean;
	smWidth?: boolean;
};

const CenterLayout: React.FC<PropType> = ({ children, noWidth, smWidth }) => {
	return (
		<div className='h-full flex items-center justify-center'>
			<div
				className={`w-full h-full mx-3 md:mx-0 p-4 bg-white rounded-xl shadow-md ${
					!noWidth && 'md:w-11/12 lg:w-4/5'
				} ${smWidth && 'md:max-w-md lg:max-w-lg'}`}
			>
				{children}
			</div>
		</div>
	);
};

export default CenterLayout;
