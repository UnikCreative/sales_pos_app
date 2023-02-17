import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { toast } from 'react-toastify';
import { ComponentToPrint } from "../components/ComponentToPrint";
import { useReactToPrint } from 'react-to-print';

const POSPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }

  const fetchProducts = async () => {
    setisLoading(true);
    const result = await axios.get("http://localhost:5000/products");
    setProducts(await result.data);
    setisLoading(false);
  };

  const addProductToCart = async(product) => {
    // check if the adding product exist
    let findProductInCart = await cart.find(i=> {
      return i.id === product.id
    });

    if(findProductInCart){
      let newCart = [];
      let newitem;

      cart.forEach(cartItem => {
        if(cartItem.id === product.id){
          newitem ={
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1)
          }
          newCart.push(newitem);
        } else{
          newCart.push(cartItem);
        }
      }); 

      setCart(newCart);
      toast(`Added ${newitem.name} to Cart `, toastOptions)
    } else {
      let addingProduct = {
        ...product,
        'quantity': 1,
        'totalAmount': product.price,
      }
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to Cart `, toastOptions)

    }
  }

  const removeProduct = async(product)=> {
    const newCart = cart.filter(cartItem => cartItem.id !== product.id);
    setCart(newCart);
  }
  const ComponentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => ComponentRef.current,
  });

  const handlePrint = ()=>{
    handleReactToPrint ();
  }

  useEffect(() => {
    fetchProducts();
  }, []);


  useEffect(() => {
      let newTotalAmount = 0;
      cart.forEach(icart => {
        newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
      })
      setTotalAmount(newTotalAmount);
  }, [cart])


  return (
    <MainLayout>
      <div className="row">
        <div className="col-sm-8">
          {isLoading ? (
            "loading..."
          ) : (
            <div className="row">
              {products.map((product, key) => (
                <div key={key} className="col-lg-4">
                  <div className="border post-item px-3 text-center" onClick={() => addProductToCart(product)}>
                    <p>{product.name}</p>
                    <img
                      src={product.image}
                      className="img-fluid rounded img-scale"
                      alt={product.name}
                    />
                    <p> ${product.price} </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className="col-sm-4">
              <div style={{display: "none"}}>
                <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={ComponentRef} />
              </div>
          <div className="table-responsive bg-dark">
            <table className="table table-responsive table-dark table-hover">
              <thead>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Qty</td>
                  <td>Total</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                { cart ? cart.map((cartProduct, key) => <tr key={key}>
                  <td> {cartProduct.id} </td>
                  <td> {cartProduct.name} </td>
                  <td> {cartProduct.price} </td>
                  <td> {cartProduct.quantity} </td>
                  <td> {cartProduct.totalAmount} </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeProduct(cartProduct)}>Remove</button>
                  </td>


                </tr>)
                : 'No Item In Cart' }
              </tbody>
            </table>
            <h2 className="px-2 text-white"> Total Amount ${totalAmount}</h2>
          </div>
          
          <div className="mt-3">
            {totalAmount !== 0 ? <div>
              <button onClick={handlePrint} className="btn btn-primary">
                Pay Now
              </button>
            </div> : 'Please add a product to the cart'
            
            }
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default POSPage;
