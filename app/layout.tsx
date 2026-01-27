import './globals.css'

export const metadata = {
  title: 'AI你画我猜',
  description: 'AI生成的绘画猜测游戏',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
