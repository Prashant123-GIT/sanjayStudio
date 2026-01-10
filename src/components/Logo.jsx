export default function Logo({ className = "w-8 h-8", color = "currentColor" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Sanjay Studio Logo"
        >
            <path
                d="M50 5 L50 95 M5 50 L95 50 M25 25 L75 75 M75 25 L25 75"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                className="opacity-20"
            />
            <circle cx="50" cy="50" r="35" stroke={color} strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="15" stroke={color} strokeWidth="1" fill="none" />
            <path
                d="M50 20 L50 30 M80 50 L70 50 M50 80 L50 70 M20 50 L30 50"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
