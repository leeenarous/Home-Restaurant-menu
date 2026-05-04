import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState("menu"); // menu | about

  useEffect(() => {
    fetch(
      "https://opensheet.elk.sh/1s-23Wc5ey1m267UNM59V8wwW72JiKmuVJ3V45djA0FE/1"
    )
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        setLoading(false);
      });
  }, []);

  const categories = ["الكل", ...new Set(menu.map((i) => i.section))];

  const filteredMenu = menu.filter((item) => {
    const matchCategory =
      selectedCategory === "الكل" || item.section === selectedCategory;

    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  if (loading) {
    return (
      <div className="skeleton-container">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="skeleton-card"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="app">

      {!showMenu ? (
  <div className="hero">
    <div className="hero-bg"></div>

    <div className="hero-content">
      <h1 className="hero-title">HOME RESTAURANT</h1>

      <p className="hero-sub">
        A modern dining experience crafted with taste & elegance
      </p>

      <button
        className="hero-btn"
        onClick={() => setShowMenu(true)}
      >
        Enter Menu
      </button>
    </div>
  </div>
) : (
        <>

          <div className="nav">
            <button onClick={() => setPage("menu")}>Menu</button>
            <button onClick={() => setPage("about")}>About</button>
          </div>

        
          {page === "about" ? (
            <div className="about">
              <h1>About Restaurant</h1>
              <p>
                This is a modern digital restaurant menu built with React.
                Smooth UI, fast filtering, and elegant design experience.
              </p>

              <footer>
                Developed by <b>Leen Arous</b>
              </footer>
            </div>
          ) : (

           
            <div className="menu">

              <header className="header">
                <h1>🍽 Menu</h1>

                <input
                  placeholder="ابحث عن طبق..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </header>

            
              <div className="categories">
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    className={selectedCategory === cat ? "active" : ""}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              
              <div className="grid fade-in">
               {filteredMenu.map((item, i) => (
  <div className="card" key={i}>

    <div className="img-box">
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        decoding="async"
        className="menu-img"
      />
    </div>

    <div className="info">
      <h2>{item.name}</h2>
      <p>{item.section}</p>
      <span>{item.price} ل.س</span>

  
    </div>

  </div>
))}
              </div>

            
              {selectedItem && (
                <div className="modal" onClick={() => setSelectedItem(null)}>
                  <div className="modal-box">
                    <h2>{selectedItem.name}</h2>
                    <img src={selectedItem.image} />
                    <p>{selectedItem.section}</p>
                    <span>{selectedItem.price} ل.س</span>
                  </div>
                </div>
              )}

              <footer>
                Developed by <b>Leen Arous</b>
              </footer>

            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;