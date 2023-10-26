import Link from 'next/link';
import Table from '../../components/table/page';

export default function Home() {
  return (
    <div>
      <h1>
        Home page <Link href="/">this page!</Link>
      </h1>
      <div>
        <Table />
      </div>
    </div>
  );
}
