'use client'

import { PartyProvider } from '@/lib/party-context'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PartyProvider>
          {children}
        </PartyProvider>
      </body>
    </html>
  )
}
