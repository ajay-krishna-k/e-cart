import React from 'react'
import {Row,Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useFetch from '../Hooks/useFetch';
import { useDispatch } from 'react-redux';
import { addToWishlist } from '../Redux/slices/wishlistSlice';
import { addToCart } from '../Redux/slices/cartSlice';

function Home() {
    
  const data = useFetch('https://fakestoreapi.com/products')
  console.log(data);

  const dispatch = useDispatch()

  return (
    <>
    <Row className='m-5'>
      {data?.length>0?
      data.map((item)=>(
        <Col className='mb-5' sm={12} md={6} lg={4} xl={3}>
      <Card style={{ width: '18rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }} >
      <Card.Img variant="top" src={item.image} style={{height:'200px'}} />
      <Card.Body>
        <Card.Title>{item.title.slice(0,17)}</Card.Title>
        <Card.Text>
        <p> {item.description.slice(0,40)}</p>
        <p className='fw-bolder'>Price: ₹{item.price}</p>
        </Card.Text>
        <div className='d-flex align-items-center justify-content-between'>
          <Button onClick={()=>dispatch(addToWishlist(item))} variant="outline-danger btn rounded"><i class="fa-solid fa-heart fs-4"></i></Button>
          <Button onClick={()=>dispatch(addToCart(item))} variant="outline-info m-1 btn rounded"><i class="fa-solid fa-cart-plus fs-4"></i></Button>
        </div>

      </Card.Body>
    </Card>
      </Col>)):
      <p>Nothing to display</p> }
    </Row>
    </>
  )
}

export default Home