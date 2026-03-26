import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-14 w-52 mix-blend-multiply transition-transform duration-300 hover:scale-[1.03]">
      <Image
        src="/career.png"
        alt="Career Copilot"
        fill
        priority
        sizes="192px"
        className="object-contain object-left"
      />
    </div>
  );
}
