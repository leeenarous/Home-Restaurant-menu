function Navbar({ setPage, cart }) {

  return (
    <nav className="nav">

      <div className="logo">
        🍽 HOME RESTAURANT
      </div>


      <div className="nav-links">


        <button
          onClick={() => setPage("menu")}
        >
          Menu
        </button>



        <button
          onClick={() => setPage("about")}
        >
          About
        </button>



        <button
          onClick={() => setPage("cart")}
        >
          🛒 Cart ({cart.length})
        </button>


      </div>


    </nav>
  );

}


export default Navbar;