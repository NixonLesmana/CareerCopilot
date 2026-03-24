import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "@/app/globals.css";
import { isClerkConfigured } from "@/lib/env";

export const metadata: Metadata = {
  title: "Career Copilot",
  description: "AI resume and job match copilot for students and new grads.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = (
    <html lang="en">
      <body className="page-shell">{children}</body>
    </html>
  );

  if (!isClerkConfigured()) {
    return content;
  }

  return (
    <ClerkProvider>
      {content}
    </ClerkProvider>
  );
}
