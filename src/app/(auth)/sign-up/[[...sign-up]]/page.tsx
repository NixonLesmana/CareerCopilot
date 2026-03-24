import { SignUp } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/env";

export default function SignUpPage() {
  if (!isClerkConfigured()) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md rounded-[32px] border border-[var(--border)] bg-white/80 p-8 text-center">
          Add real Clerk keys in `.env.local` to enable sign-up.
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <SignUp />
    </main>
  );
}
