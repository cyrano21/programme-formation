import { Inter } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'CoachVerse',
  description: 'Plateforme de formation et coaching professionnel',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
