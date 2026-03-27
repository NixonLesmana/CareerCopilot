import Image from "next/image";

export function Logo() {
  return (
    <div className="relative -my-4 h-16 w-52 overflow-hidden mix-blend-multiply transition-transform duration-300 hover:scale-[1.03]">
      <Image
        src="/logo.png"
        alt="Career Copilot"
        fill
        priority
        sizes="280px"
        className="object-contain object-left -translate-y-1 scale-[1.08]"
      />
    </div>
  );
}
