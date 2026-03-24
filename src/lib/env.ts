export function isClerkConfigured() {
  const publishable = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  const secret = process.env.CLERK_SECRET_KEY ?? "";
  return (
    publishable.startsWith("pk_") &&
    secret.startsWith("sk_") &&
    !publishable.includes("placeholder") &&
    !secret.includes("placeholder")
  );
}

export function isClerkClientConfigured() {
  const publishable = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  return publishable.startsWith("pk_") && !publishable.includes("placeholder");
}
