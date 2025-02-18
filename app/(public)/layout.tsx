import { ThemeProvider } from '@/contexts/ThemeContext'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="public-layout">
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </div>
  )
}


