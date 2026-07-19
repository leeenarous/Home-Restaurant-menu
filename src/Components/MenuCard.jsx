import { useState } from "react";

function MenuCard({ item, onClick, addToCart }) {

  const [loaded, setLoaded] = useState(false);


  return (

    <div className="card">


      <div
        className="img-box"
        onClick={onClick}
      >

        <img

          src={item.image}

          alt={item.name}

          loading="lazy"

          className={
            `menu-img ${loaded ? "loaded" : ""}`
          }

          onLoad={() => setLoaded(true)}

        />

      </div>




      <div className="info">


        <h2>
          {item.name}
        </h2>


        <p>
          {item.section}
        </p>


        <span>
          {item.price} ل.س
        </span>




        <button

          className="order-btn"

          onClick={() => addToCart(item)}

        >

          Add To Cart 🛒

        </button>


      </div>


    </div>

  );

}


export default MenuCard;