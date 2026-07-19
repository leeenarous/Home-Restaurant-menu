function Cart({ cart, setCart }) {


  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );


  const removeItem = (index) => {

    const newCart = cart.filter(
      (_, i) => i !== index
    );

    setCart(newCart);

  };



  const increase = (index) => {

    setCart(
      cart.map((item, i) =>
        i === index
        ?
        {
          ...item,
          quantity: item.quantity + 1
        }
        :
        item
      )
    );

  };



  const decrease = (index) => {

    setCart(
      cart.map((item, i) =>
        i === index && item.quantity > 1
        ?
        {
          ...item,
          quantity: item.quantity - 1
        }
        :
        item
      )
    );

  };



  return (

    <div className="cart">


      <h1>
        🛒 Your Cart
      </h1>



      {
        cart.length === 0 ?

        <p>
          Your cart is empty
        </p>


        :


        <>


        {
          cart.map((item,index)=>(

            <div
            className="cart-item"
            key={index}
            >


              <img
              src={item.image}
              alt={item.name}
              />


              <div>


                <h3>
                  {item.name}
                </h3>


                <p>
                  {item.price} S.Y
                </p>



                <div className="quantity">


                  <button
                  onClick={() => decrease(index)}
                  >
                    -
                  </button>



                  <span>
                    {item.quantity}
                  </span>



                  <button
                  onClick={() => increase(index)}
                  >
                    +
                  </button>


                </div>


              </div>



              <button
              onClick={() => removeItem(index)}
              >
                Remove
              </button>


            </div>

          ))
        }




        <h2>
          Total: {total} ل.س
        </h2>



        <button className="checkout-btn">
          Place Order (Demo)
        </button>



        </>

      }


    </div>

  );

}


export default Cart;