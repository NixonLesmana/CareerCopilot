import { CoverLetter } from "@/types/domain";

export function CoverLetterPreview({ letter }: { letter: CoverLetter }) {
  return (
    <div className="rounded-[32px] bg-[#fffdf8] p-8 shadow-[0_25px_60px_rgba(13,24,40,0.08)]">
      <p className="text-sm leading-7">{letter.greeting}</p>
      <p className="mt-6 text-sm leading-7">{letter.intro}</p>
      {letter.body.map((paragraph) => (
        <p key={paragraph} className="mt-4 text-sm leading-7">
          {paragraph}
        </p>
      ))}
      <p className="mt-6 text-sm leading-7">{letter.closing}</p>
    </div>
  );
}
