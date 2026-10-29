import { useMemo, useState } from "react";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

const categories = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Drinks",
];

export default function Home() {
  const { recipes } = useRecipes();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredRecipes = useMemo(
    () =>
      recipes.filter((recipe) => {
        const matchesCategory =
          category === "All" || recipe.category === category;

        const query = search.toLowerCase().trim();

        const matchesSearch =
          !query ||
          `${recipe.title} ${recipe.description} ${
            recipe.ingredients.join(" ")
          }`
            .toLowerCase()
            .includes(query);

        return matchesCategory && matchesSearch;
      }),
    [recipes, search, category]
  );

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            YOUR LITTLE KITCHEN COMPANION
          </span>

          <h1>
            Good food. <br />
            <span>Good mood.</span>
          </h1>

          <p>
            Keep your favorite recipes close, discover your
            next meal, and make every day a little more
            delicious.
          </p>

          <a
            className="button button-primary hero-button"
            href="#recipes"
          >
            Explore recipes <span>→</span>
          </a>

          <div className="hero-stats">
            <div>
              <strong>
                {recipes.length.toString().padStart(2, "0")}
              </strong>
              <span>Recipes</span>
            </div>

            <div className="stat-divider" />

            <div>
              <strong>∞</strong>
              <span>Things to cook</span>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <div className="hero-image-main">
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=80"
              alt="A colorful, freshly prepared meal"
            />
          </div>

          <div className="floating-note">
            <span className="note-icon">✦</span>
            <div>
              <strong>Made with love</strong>
              <span>Served with happiness</span>
            </div>
          </div>

          <div className="hero-spark spark-one">✳</div>
          <div className="hero-spark spark-two">✦</div>
        </div>
      </section>

      <section className="recipes-section" id="recipes">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE RECIPE BOX</span>
            <h2>
              Find your next <span>favorite.</span>
            </h2>
          </div>

          <span className="recipe-count">
            {recipes.length} recipes and counting
          </span>
        </div>

        <div className="recipe-controls">
          <label className="search-box">
            <span>⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search recipes, ingredients..."
              aria-label="Search recipes"
            />
          </label>

          <div
            className="category-filters"
            aria-label="Filter by category"
          >
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={`filter-chip ${
                  category === item ? "active" : ""
                }`}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filteredRecipes.length ? (
          <div className="recipe-grid">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>⌕</span>
            <h3>No recipes found</h3>
            <p>
              Try another search or choose a different category.
            </p>

            <button
              type="button"
              className="button button-primary"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear filters →
            </button>
          </div>
        )}
      </section>
    </>
  );
}