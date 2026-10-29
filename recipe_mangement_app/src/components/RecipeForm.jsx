
import { useState } from "react";

const emptyForm = {
  title: "",
  category: "Dinner",
  time: "20",
  servings: "2",
  difficulty: "Easy",
  image: "",
  description: "",
  ingredients: "",
  instructions: "",
};

export default function RecipeForm({ onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const update = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = (event) => {
    event.preventDefault();

    const ingredients = form.ingredients
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const instructions = form.instructions
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !ingredients.length ||
      !instructions.length
    ) {
      setError(
        "Please add a title, description, ingredients, and instructions."
      );
      return;
    }

    setError("");

    onSubmit({
      ...form,
      title: form.title.trim(),
      time: Math.max(1, Number(form.time) || 1),
      servings: Math.max(1, Number(form.servings) || 1),
      ingredients,
      instructions,
      image: form.image.trim(),
    });
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      <div className="form-grid">
        <label className="field full-width">
          Recipe name *
          <input
            name="title"
            value={form.title}
            onChange={update}
            placeholder="e.g. Creamy Pasta"
            required
          />
        </label>

        <label className="field">
          Category
          <select
            name="category"
            value={form.category}
            onChange={update}
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Dessert</option>
            <option>Snack</option>
          </select>
        </label>

        <label className="field">
          Difficulty
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={update}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </label>

        <label className="field">
          Prep time (minutes)
          <input
            name="time"
            type="number"
            min="1"
            value={form.time}
            onChange={update}
          />
        </label>

        <label className="field">
          Servings
          <input
            name="servings"
            type="number"
            min="1"
            value={form.servings}
            onChange={update}
          />
        </label>

        <label className="field full-width">
          Image URL (optional)
          <input
            name="image"
            type="url"
            value={form.image}
            onChange={update}
            placeholder="https://example.com/image.jpg"
          />
        </label>

        <label className="field full-width">
          Short description *
          <textarea
            name="description"
            value={form.description}
            onChange={update}
            placeholder="Describe your recipe..."
            required
          />
        </label>

        <label className="field full-width">
          Ingredients *
          <span className="field-hint">
            One ingredient per line
          </span>
          <textarea
            name="ingredients"
            value={form.ingredients}
            onChange={update}
            placeholder={"2 cups flour\n1 cup milk\n2 eggs"}
            required
          />
        </label>

        <label className="field full-width">
          Instructions *
          <span className="field-hint">
            One step per line
          </span>
          <textarea
            name="instructions"
            value={form.instructions}
            onChange={update}
            placeholder={
              "Preheat the oven.\nMix the ingredients.\nBake until ready."
            }
            required
          />
        </label>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="button button-light"
          onClick={() => {
            setForm(emptyForm);
            setError("");
          }}
        >
          Clear form
        </button>

        <button
          type="submit"
          className="button button-primary"
        >
          Save recipe <span>→</span>
        </button>
      </div>
    </form>
  );
}