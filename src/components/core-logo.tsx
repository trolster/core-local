type CoreLogoProps = {
	size?: number;
	className?: string;
};

export function CoreLogo({ size = 16, className = "" }: CoreLogoProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 200 200"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<circle cx="100" cy="100" r="32" fill="currentColor" />
			<polygon
				points="100,20 169.28,60 169.28,140 100,180 30.72,140 30.72,60"
				fill="none"
				stroke="currentColor"
				strokeWidth="12"
				strokeLinejoin="miter"
				strokeMiterlimit="10"
			/>
		</svg>
	);
}
