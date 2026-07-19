function Hero({onEnter}) {

  return (

    <section className="hero">


      <div className="hero-overlay"></div>


      <div className="hero-content">


        <p className="hero-small">
          Welcome To
        </p>


        <h1 className="hero-title">
          HOME RESTAURANT
        </h1>


        <p className="hero-sub">
          Delicious meals crafted with passion and elegance
        </p>



        <button
          className="hero-btn"
          onClick={onEnter}
        >
          Explore Menu
        </button>


      </div>


    </section>

  );

}


export default Hero;