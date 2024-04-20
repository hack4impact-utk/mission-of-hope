import TopBar from '@/components/top-bar';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <TopBar></TopBar>
        {children}
      </body>
    </html>
  );
}
