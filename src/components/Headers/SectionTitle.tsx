import React from 'react';

type Props = {
	title: string;
	children?: React.ReactNode;
};

const SectionTitle = ({ title, children }: Props) => {
	return (
		<div className='flex items-center gap-2 mb-3'>
			{children}
			<h2 className='text-2xl font-medium text-emerald-500'>{title}</h2>
		</div>
	);
};

export default SectionTitle;
