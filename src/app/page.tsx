import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>
        Home page <Link href="/samplePage">this page!</Link>
      </h1>
    </div>
  );
}
