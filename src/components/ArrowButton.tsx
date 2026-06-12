import Link from "next/link";

const variants = {
  solid: "bg-[#EEBA0B] text-black hover:bg-[#F2F2F0]",
  outline:
    "border border-white/40 text-white backdrop-blur-sm hover:bg-[#F2F2F0] hover:text-black hover:border-[#F2F2F0]",
};

const iconVariants = {
  solid: "bg-black",
  outline:
    "border border-white/40 group-hover:bg-black group-hover:border-black",
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
  className = "",
}: ArrowButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group inline-flex h-12 items-center gap-2 rounded-full font-semibold text-base pl-6 pr-3 py-2 hover:pl-3 hover:flex-row-reverse transition-all duration-800 ease-out ${variants[variant]} ${className}`}
    >
      <span className="transition-transform duration-800 ease-out group-hover:translate-x-1">
        {children}
      </span>
      <span
        className={`self-stretch aspect-square rounded-full flex items-center justify-center transition-all duration-800 ease-out group-hover:-translate-x-1 ${iconVariants[variant]}`}
      >
        <ArrowIcon color="white" />
      </span>
    </Link>
  );
}

export function ArrowIcon({
  color = "black",
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
