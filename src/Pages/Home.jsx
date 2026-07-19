import { useEffect, useState } from "react";

import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Category from "../Components/Category";
import MenuCard from "../Components/MenuCard";
import Footer from "../Components/Footer";
import Cart from "../Components/Cart";

import About from "./About";


function Home() {

  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page,setPage] = useState("menu");
const [cart,setCart] = useState([]);



useEffect(() => {

  const loadMenu = async () => {

    try {

      const response = await fetch(
        "https://opensheet.elk.sh/1s-23Wc5ey1m267UNM59V8wwW72JiKmuVJ3V45djA0FE/1"
      );


      if (!response.ok) {
        throw new Error("Failed to load menu");
      }


      const data = await response.json();


      setMenu(data);


    } catch (error) {

      console.log("Menu loading error:", error);

    } finally {

      setLoading(false);

    }

  };


  loadMenu();


}, []);




  const categories = [
    "الكل",
    ...new Set(menu.map(item => item.section))
  ];




  const filteredMenu = menu.filter(item => {

    const categoryMatch =
      selectedCategory === "الكل" ||
      item.section === selectedCategory;


    const searchMatch =
      item.name
      .toLowerCase()
      .includes(search.toLowerCase());


    return categoryMatch && searchMatch;

  });





  const addToCart = (item) => {

  const existingItem = cart.find(
    (cartItem) => cartItem.name === item.name
  );


  if (existingItem) {

    setCart(
      cart.map((cartItem) =>
        cartItem.name === item.name
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem
      )
    );


  } else {

    setCart([
      ...cart,
      {
        ...item,
        quantity: 1,
      },
    ]);

  }

};





  if(loading){

    return (

      <div className="skeleton-container">

        {[1,2,3,4,5,6].map(i => (

          <div
          key={i}
          className="skeleton-card"
          />

        ))}

      </div>

    );

  }





  return (

    <div className="app">


      {!showMenu ? (

        <Hero
          onEnter={() => setShowMenu(true)}
        />

      ) : (

        <>


          <Navbar 
 setPage={setPage}
 cart={cart}
/>



          {
            page === "about" ?

            <About />

            :
page === "about" ?

<About />

:

page === "cart" ?

<Cart 
 cart={cart}
 setCart={setCart}
/>

:


            <>


              <header className="header">


                <h1>
                  🍽 Menu
                </h1>



                <input

                  placeholder="ابحث عن طبق..."

                  onChange={(e)=>
                    setSearch(e.target.value)
                  }

                />


              </header>





              <Category

                categories={categories}

                selectedCategory={selectedCategory}

                setSelectedCategory={setSelectedCategory}

              />






              <div className="grid fade-in">


                {
                  filteredMenu.map((item,index)=>(


                    <MenuCard

                      key={index}

                      item={item}


                      onClick={() =>
                        setSelectedItem(item)
                      }


                      addToCart={addToCart}


                    />


                  ))
                }


              </div>





              {
                selectedItem &&


                <div

                className="modal"

                onClick={() =>
                  setSelectedItem(null)
                }

                >


                  <div className="modal-box">


                    <h2>
                      {selectedItem.name}
                    </h2>



                    <img
                    src={selectedItem.image}
                    />



                    <p>
                      {selectedItem.section}
                    </p>



                    <span>
                      {selectedItem.price} S.Y
                    </span>



                  </div>


                </div>


              }





            </>


          }



          <Footer />


        </>


      )}


    </div>

  );

}


export default Home;