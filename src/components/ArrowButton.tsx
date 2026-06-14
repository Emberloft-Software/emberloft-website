import Link from "next/link";

const variants = {
  solid: "bg-[#EEBA0B] text-[#0A0A0A] hover:bg-[#F2F2F0]",
  outline:
    "border border-[#F5F5F5]/40 text-[#F5F5F5] backdrop-blur-sm hover:bg-[#F2F2F0] hover:text-[#0A0A0A] hover:border-[#F2F2F0]",
};

const iconVariants = {
  solid: "bg-[#0A0A0A] text-[#F5F5F5]",
  outline:
    "bg-[#F5F5F5] border border-[#F5F5F5] text-[#0A0A0A] group-hover:bg-[#0A0A0A] group-hover:border-[#0A0A0A] group-hover:text-[#F5F5F5]",
};

type ArrowButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  onClick?: () => void;
  className?: string;
};

export default function ArrowButton({
  href,
  children,
  variant = "solid",
  onClick,
  className = "inline-flex",
}: ArrowButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative h-12 items-center overflow-hidden rounded-full font-semibold text-base pl-6 pr-12 hover:pl-12 hover:pr-6 transition-all duration-800 ease-in-out ${variants[variant]} ${className}`}
    >
      <span className="relative z-0">
        {children}
      </span>
      <span
        className={`absolute z-10 top-1/2 -translate-y-1/2 left-[calc(100%-2.75rem)] group-hover:left-1 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-800 ease-in-out ${iconVariants[variant]}`}
      >
        <ArrowIcon />
      </span>
    </Link>
  );
}

export function ArrowIcon({
  color = "currentColor",
  className = "w-1/2 h-1/2",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 10 10" fill="none">
      <path
        d="M2 8L8 2M8 2H3M8 2V7"
        stroke={color}
        strokeWidth="1.0"
        strokeLinecap="round"
      />
    </svg>
  );
}
