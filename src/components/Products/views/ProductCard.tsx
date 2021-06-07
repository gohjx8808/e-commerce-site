import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import getStripe from '../../../utils/stripejs';

interface ProductCardOwnProps{
  product:products.productDetails
}

const ProductCard = (props:ProductCardOwnProps) => {
  const { product } = props;
  const [loading, setLoading] = useState(false);

  const formatPrice = (amount:number, currency:string) => {
    const price = parseFloat((amount / 100).toFixed(2));
    const numberFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
    });
    return numberFormat.format(price);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const price = new FormData(event.target).get('priceSelect');
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems: [{ price, quantity: 1 }],
      successUrl: `${window.location.origin}/page-2/`,
      cancelUrl: `${window.location.origin}/advanced`,
    });

    if (error) {
      setLoading(false);
    }
  };

  return (
    <Card
      border="info"
      style={{
        width: '18rem',
        boxShadow: '5px 5px 25px 0 rgba(46,61,73,.2)',
        backgroundColor: '#fff',
        borderRadius: '6px',
      }}
    >
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId={product.name}>
            <Card.Title>{product.name}</Card.Title>
            <Form.Label>
              Price
              {' '}
              <Form.Control as="select" name="priceSelect">
                {product.prices.map((price) => (
                  <option key={price.id} value={price.id}>
                    {formatPrice(price.unit_amount, price.currency)}
                  </option>
                ))}
              </Form.Control>
            </Form.Label>
          </Form.Group>
          <Button
            disabled={loading}
            className="btn btn-primary"
            type="submit"
          >
            BUY ME
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
