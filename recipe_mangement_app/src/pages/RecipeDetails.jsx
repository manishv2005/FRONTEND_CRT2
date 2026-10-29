import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    getRecipe,
    favorites,
    toggleFavorite,
    deleteRecipe,
  } = useRecipes();

  const recipe = getRecipe(id);

  if (!recipe) {
    return (
      <div className="empty-state details-empty">
        <span>🍽️</span>
        <h2>Recipe not found</h2>
        <p>
          It may have been deleted or the link is incorrect.
        </p>
        <Link to="/" className="button button-primary">
          Back to recipes
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(recipe.id);

  const handleDelete = () => {
    if (
      window.confirm(
        `Delete "${recipe.title}"? This cannot be undone.`
      )
    ) {
      deleteRecipe(recipe.id);
      navigate("/");
    }
  };

  return (
    <article className="details-page">
      <Link to="/" className="back-link">
        ← Back to all recipes
      </Link>

      <div className="details-hero">
        <img
          src={
            recipe.image ||
            "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80"
          }
          alt={recipe.title}
        />

        <div className="details-hero-overlay" />

        <div className="details-title">
          <span className="category-pill">
            {recipe.category}
          </span>

          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
        </div>
      </div>

      <div className="details-actions">
        <div className="quick-facts">
          <span>
            ◷ <b>{recipe.time} min</b>
            <small>Total time</small>
          </span>

          <span>
            🍽 <b>{recipe.servings}</b>
            <small>Servings</small>
          </span>

          <span>
            ✦ <b>{recipe.difficulty}</b>
            <small>Difficulty</small>
          </span>
        </div>

        <div className="action-buttons">
          <button
            type="button"
            className="button button-light"
            onClick={() => toggleFavorite(recipe.id)}
          >
            {isFavorite ? "♥ Saved" : "♡ Save recipe"}
          </button>

          <button
            type="button"
            className="button button-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="details-content">
        <section className="ingredients-panel">
          <span className="eyebrow">WHAT YOU'LL NEED</span>
          <h2>Ingredients</h2>

          <p className="muted">
            {recipe.ingredients.length} items for{" "}
            {recipe.servings} servings
          </p>

          <ul className="ingredient-list">
            {recipe.ingredients.map((item, index) => (
              <li key={`${item}-${index}`}>
                <span className="ingredient-check">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="instructions-panel">
          <span className="eyebrow">LET'S GET COOKING</span>
          <h2>Instructions</h2>

          <ol className="instruction-list">
            {recipe.instructions.map((step, index) => (
              <li key={`${step}-${index}`}>
                <span className="step-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}