import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function Home() {
  const exDonItem = {
    _id: {
      $oid: '65c1251027ca0d6da7ccf409',
    },
    item: {
      $oid: '65c1251027ca0d6da7ccf3ff',
    },
    quantity: 10,
    barcode: 'ABC123',
    value: {
      price: 499.99,
      evaluation: 'High',
      inRange: true,
    },
  };
  return (
    <Card>
      <CardContent>
        <h1>ProductA</h1>
        <p>Quantity: {exDonItem.quantity}</p>
        <p>Price: {exDonItem.value.price}</p>
        <p>Evaluation: {exDonItem.value.evaluation}</p>
      </CardContent>
    </Card>
  );
}
