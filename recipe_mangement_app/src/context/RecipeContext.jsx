import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const RecipeContext = createContext(null);

const STORAGE_KEY = "recipebook-recipes-v1";
const FAVORITES_KEY = "recipebook-favorites-v1";

const starterRecipes = [
  {
    id: "r1",
    title: "Creamy Tomato Pasta",
    category: "Dinner",
    time: 25,
    servings: 2,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=80",
    description:
      "A comforting pasta tossed in a silky tomato and cream sauce with fresh basil.",
    ingredients: [
      "200 g pasta",
      "1 cup tomato puree",
      "2 tbsp cream",
      "2 garlic cloves",
      "Fresh basil",
      "Salt and pepper",
    ],
    instructions: [
      "Boil pasta in salted water according to the packet instructions.",
      "Saute garlic in a pan with a little oil.",
      "Add tomato puree and cook for 5 minutes.",
      "Stir in cream, salt, and pepper.",
      "Add pasta, mix well, and garnish with fresh basil.",
    ],
  },
  {
    id: "r2",
    title: "Avocado Toast",
    category: "Breakfast",
    time: 10,
    servings: 1,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80",
    description:
      "Crispy sourdough topped with creamy avocado, lemon, and chilli flakes.",
    ingredients: [
      "2 slices sourdough",
      "1 ripe avocado",
      "1 tsp lemon juice",
      "Chilli flakes",
      "Salt and pepper",
    ],
    instructions: [
      "Toast the bread until golden.",
      "Mash avocado with lemon juice, salt, and pepper.",
      "Spread avocado over the toast.",
      "Sprinkle chilli flakes and serve.",
    ],
  },
  {
    id: "r3",
    title: "Rainbow Buddha Bowl",
    category: "Lunch",
    time: 30,
    servings: 2,
    difficulty: "Medium",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80",
    description:
      "A colorful, nourishing bowl with grains, crunchy vegetables, and a zesty dressing.",
    ingredients: [
      "1 cup cooked quinoa",
      "1 cucumber",
      "1 carrot",
      "1 cup chickpeas",
      "Lemon juice",
      "Olive oil",
      "Salt and pepper",
    ],
    instructions: [
      "Cook quinoa and let it cool slightly.",
      "Chop the vegetables and rinse the chickpeas.",
      "Arrange quinoa, vegetables, and chickpeas in a bowl.",
      "Mix lemon juice, olive oil, salt, and pepper.",
      "Pour the dressing over the bowl and serve.",
    ],
  },
];

function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(() =>
    loadFromStorage(STORAGE_KEY, starterRecipes)
  );

  const [favorites, setFavorites] = useState(() =>
    loadFromStorage(FAVORITES_KEY, [])
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const addRecipe = (recipe) => {
    const newRecipe = {
      ...recipe,
      id:
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : String(Date.now()),
    };

    setRecipes((current) => [newRecipe, ...current]);

    return newRecipe;
  };

  const deleteRecipe = (id) => {
    setRecipes((current) =>
      current.filter((recipe) => recipe.id !== id)
    );

    setFavorites((current) =>
      current.filter((favoriteId) => favoriteId !== id)
    );
  };

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  };

  const value = useMemo(
    () => ({
      recipes,
      favorites,
      addRecipe,
      deleteRecipe,
      toggleFavorite,
      getRecipe: (id) =>
        recipes.find((recipe) => recipe.id === id),
    }),
    [recipes, favorites]
  );

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error(
      "useRecipes must be used inside RecipeProvider"
    );
  }

  return context;
}