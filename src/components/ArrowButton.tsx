import Link from "next/link";

const variants = {
  solid: "bg-[#EEBA0B] text-black hover:brightness-110",
  outline: "border border-white/40 text-white hover:bg-white/10 backdrop-blur-sm",
};

const iconVariants = {
  solid: "bg-black",
  outline: "border border-white/40",
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
      className={`group inline-flex items-center gap-2 rounded-full font-semibold text-sm pl-5 pr-2 py-2 transition-all ${variants[variant]} ${className}`}
    >
      <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
        {children}
      </span>
      <span
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-1 ${iconVariants[variant]}`}
      >
        <ArrowIcon color="white" />
      </span>
    </Link>
  );
}

export function ArrowIcon({ color = "black" }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M2 8L8 2M8 2H3M8 2V7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
