function Category({
  categories,
  selectedCategory,
  setSelectedCategory
}) {

  return (
    <div className="categories">

      {categories.map((cat) => (

        <button
          key={cat}
          className={
            selectedCategory === cat 
            ? "active" 
            : ""
          }

          onClick={() => setSelectedCategory(cat)}
        >

          {cat}

        </button>

      ))}

    </div>
  );

}

export default Category;