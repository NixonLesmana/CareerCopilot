import { CoverLetter } from "@/types/domain";

export function CoverLetterPreview({ letter }: { letter: CoverLetter }) {
  return (
    <div className="rounded-[28px] bg-[#fffdf8] p-6 shadow-[0_20px_45px_rgba(13,24,40,0.07)]">
      <p className="text-sm leading-6">{letter.greeting}</p>
      <p className="mt-4 text-sm leading-6">{letter.intro}</p>
      {letter.body.map((paragraph) => (
        <p key={paragraph} className="mt-3 text-sm leading-6">
          {paragraph}
        </p>
      ))}
      <p className="mt-4 text-sm leading-6">{letter.closing}</p>
    </div>
  );
}
