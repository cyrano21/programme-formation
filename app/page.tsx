import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/dashboard')

  // Kept for TypeScript compilation, but will never be reached
  return null;
}
