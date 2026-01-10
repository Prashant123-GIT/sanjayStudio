// Decorative background pattern component for sections
export default function SectionDecor({ variant = 'floral', position = 'right' }) {
    const floralPattern = (
        <svg className="w-full h-full opacity-[0.03]" viewBox="0 0 400 400" fill="none">
            {/* Large Floral/Leaf Pattern */}
            <path
                d="M200 50 Q250 100 200 150 Q150 100 200 50 Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="currentColor"
                opacity="0.3"
            />
            <path
                d="M200 150 Q250 200 200 250 Q150 200 200 150 Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="currentColor"
                opacity="0.2"
            />
            <path
                d="M200 250 Q250 300 200 350 Q150 300 200 250 Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="currentColor"
                opacity="0.1"
            />
            {/* Additional decorative elements */}
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.15" />
            <circle cx="300" cy="300" r="60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.15" />
            <path
                d="M50 200 Q100 180 150 200 Q100 220 50 200 Z"
                fill="currentColor"
                opacity="0.1"
            />
        </svg>
    );

    const geometricPattern = (
        <svg className="w-full h-full opacity-[0.04]" viewBox="0 0 400 400" fill="none">
            {/* Geometric shapes */}
            <rect x="50" y="50" width="100" height="100" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
            <circle cx="300" cy="100" r="50" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
            <polygon points="200,250 250,350 150,350" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" />
        </svg>
    );

    const patterns = {
        floral: floralPattern,
        geometric: geometricPattern
    };

    const positionClasses = {
        right: 'right-0 top-0',
        left: 'left-0 top-0',
        center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
    };

    return (
        <div className={`absolute ${positionClasses[position]} w-[400px] h-[400px] md:w-[600px] md:h-[600px] pointer-events-none text-studio-accent overflow-hidden`}>
            {patterns[variant]}
        </div>
    );
}
