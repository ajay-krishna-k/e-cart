import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { emptycart, removeFromCart } from '../Redux/slices/cartSlice';



function Cart() {

  const cartarray = useSelector((state)=>state.cartReducer)
  console.log(cartarray);
  const dispatch = useDispatch()
  const [total,settotal] = useState(0)

  const navigate = useNavigate()

  const gettotal = ()=>{
    if(cartarray?.length>0){
      settotal(cartarray?.map(item=>item?.price).reduce((p1,p2)=>p1+p2))
    }
    else{
      settotal(0)
    }
  }

  useEffect(()=>{gettotal()},[cartarray])

  const checkout=()=>{
    dispatch(emptycart())
    alert('Thankyou..Your order is placed')
    navigate('/')
  }

  return (
   <> 
   <div style={{marginTop:'150px'}}>
   {cartarray?.length>0?
     <div className='row w-100'>
       
        <div className='col-lg-6 m-5'>
         <table className='table border shadow'>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Image</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartarray.map((item,index)=>(
              <tr>
              <td>{index+1}</td>
              <td>{item.title}</td>
              <td><img src={item.image} style={{height:"100px",width:"100px"}} alt="No image"/></td>
              <td>{item.price}</td>
              <td><Button onClick={()=>dispatch(removeFromCart(item.id))} variant="outline-primary btn rounded"><i class="fa-solid fa-trash"></i></Button></td>
            </tr>))}
          </tbody>
         </table>
       </div>

       {/* Summary div */}
       <div className='col-lg-4 d-flex justify-content-center align-items-center flex-column'>
        <div className='border shadow p-5'>
           <h2 className='text-success'>Cart Summary</h2>
           <h5>Total Number of Products : <span className='text-success fs-2 fw-bolder'>{cartarray.length}</span></h5>
           <h4>Total Price: ₹ <span className='text-success fs-2 fw-bolder'>{total.toFixed(1)}</span></h4>
           <button onClick={checkout} className='btn btn-success rounded w-100 mt-3'>CheckOut</button>
        </div>
       </div>


       </div>
       :
       <div style={{height:'100vh'}} className='d-flex flex-column  justify-content-center align-items-center'>
       <img height={'300px'} src="https://assets.materialup.com/uploads/87d4df96-a55f-4f4b-9a17-a696eded97f3/preview.gif" alt="No image" />
       <h4 className='text-warning fw-bolder mt-1'>Your Cart is Empty</h4>
       <button className='btn btn-secondary rounded '><Link style={{textDecoration:'none',color:"white"}} to={'/'}>Back to Home</Link></button>
       </div>
       }

     </div>


   
   </>
  )
}

export default Cart