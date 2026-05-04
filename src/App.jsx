import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [favorites, setFavorites] = useState([]);

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

  const toggleFav = (item) => {
    if (favorites.includes(item.name)) {
      setFavorites(favorites.filter((f) => f !== item.name));
    } else {
      setFavorites([...favorites, item.name]);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">

      {/* ===== HERO ===== */}
      {!showMenu ? (
        <div className="hero">
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>HOME RESTAURANT</h1>
              <p>Experience Taste Like Never Before 🍽</p>

              <button onClick={() => setShowMenu(true)}>
                Explore Menu
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="menu">

          {/* HEADER */}
          <header className="header">
            <h1>🍽 Menu</h1>

            <input
              type="text"
              placeholder="ابحث عن طبق..."
              onChange={(e) => setSearch(e.target.value)}
            />

            <p className="count">
              عدد الأصناف: {filteredMenu.length}
            </p>
          </header>

          {/* CATEGORIES */}
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

          {/* CARDS */}
          {filteredMenu.length === 0 ? (
            <div className="empty">لا توجد نتائج 😕</div>
          ) : (
            <div className="grid">
              {filteredMenu.map((item, i) => (
                <div className="card fade" key={i}>

                  {/* Favorite */}
                  <button
                    className="fav"
                    onClick={() => toggleFav(item)}
                  >
                    {favorites.includes(item.name) ? "❤️" : "🤍"}
                  </button>

                  <div className="img-box">
                    <img
                      src={
                        item.image ||
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                      }
                      alt={item.name}
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
          )}

        </div>
      )}

      {/* ===== TOP BUTTON ===== */}
      {showMenu && (
        <button className="top-btn" onClick={() => window.scrollTo(0, 0)}>
          ↑
        </button>
      )}

    </div>
  );
}

export default App;