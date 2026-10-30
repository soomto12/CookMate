const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
import { userAllergen } from "./userallergen";
export interface GeneratedIngredient {
  name: string;
  quantity: number | null;
  unit: string | null;
}

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface GeneratedRecipe {
  title: string;
  description: string;
  cuisine: string | null;
  servings: number | null;
  cookTimeMinutes: number | null;
  difficulty: Difficulty | null;
  ingredients: GeneratedIngredient[];
  steps: string[];
}

export interface RecipePreferences {
  excludeCommonAllergens?: boolean;
  quickMealOnly?: boolean;
}


const buildPrompt = (
  mealName: string,
  availableIngredients: string[],
  allergens: string[],
  preferences: RecipePreferences,
) => {
  const availableList =
    availableIngredients.length > 0 ? availableIngredients.join(", ") : "nothing in particular";

  const constraints: string[] = [];

  if (preferences.excludeCommonAllergens && allergens.length > 0) {
    constraints.push(
      `Do not use any of these allergens, including ingredients that contain them (e.g. sauces, stocks, or spreads): ${allergens.join(", ")}.`,
    );
  }
  
  if (preferences.quickMealOnly) {
    constraints.push("The recipe must be quick: total cook time of 30 minutes or less.");
  }

  return `The user wants to cook: "${mealName}".
They currently have these ingredients available: ${availableList}.
${constraints.length > 0 ? `\nKitchen preferences (must follow):\n${constraints.join("\n")}\n` : ""}
Write a complete recipe for "${mealName}". List every ingredient the recipe actually needs (not just the ones the user already has), and give clear, ordered, step-by-step cooking instructions.

Also estimate the total cook time in minutes, and rate the recipe's difficulty as "EASY", "MEDIUM", or "HARD".

Respond with ONLY a single JSON object, no other text, in exactly this shape:
{
  "title": string,
  "description": string,
  "cuisine": string or null,
  "servings": number or null,
  "cookTimeMinutes": number or null,
  "difficulty": "EASY" or "MEDIUM" or "HARD",
  "ingredients": [ { "name": string, "quantity": number or null, "unit": string or null } ],
  "steps": [ string, string, ... ]
}`;
};

export const generateRecipe = async (
  mealName: string,
  availableIngredients: string[],
  id : string |  undefined,
  preferences: RecipePreferences = {},
): Promise<GeneratedRecipe> => {

  const allergens = preferences.excludeCommonAllergens ? await userAllergen(id) : [];

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a precise recipe-writing assistant. Always respond with a single valid JSON object and nothing else - no markdown, no commentary.",
        },
        { role: "user", content: buildPrompt(mealName, availableIngredients, allergens, preferences) },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter request failed (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const content = data.choices?.[0]?.message?.content;

  if (typeof content !== "string") {
    throw new Error("OpenRouter response did not contain message content");
  }

  const parsed = JSON.parse(content) as GeneratedRecipe;

  if (!parsed.title || !Array.isArray(parsed.ingredients) || !Array.isArray(parsed.steps)) {
    throw new Error("AI response was missing required recipe fields");
  }

  const validDifficulties: Difficulty[] = ["EASY", "MEDIUM", "HARD"];
  const difficulty = validDifficulties.includes(parsed.difficulty as Difficulty)
    ? (parsed.difficulty as Difficulty)
    : null;

  const cookTimeMinutes =
    typeof parsed.cookTimeMinutes === "number" && Number.isFinite(parsed.cookTimeMinutes)
      ? parsed.cookTimeMinutes
      : null;

  return { ...parsed, difficulty, cookTimeMinutes };
};

export interface MealSuggestionOptions {
  allergens?: string[];
  quickMealOnly?: boolean;
  count?: number;
}

// Suggests meal names (no recipes) that can be made mostly from the given ingredients.
export const suggestMeals = async (
  availableIngredients: string[],
  options: MealSuggestionOptions = {},
): Promise<string[]> => {
  const { allergens = [], quickMealOnly = false, count = 5 } = options;

  const constraints: string[] = [];
  if (allergens.length > 0) {
    constraints.push(
      `Never suggest a meal that contains these allergens, including hidden sources such as sauces, stocks or spreads: ${allergens.join(", ")}.`,
    );
  }
  if (quickMealOnly) {
    constraints.push("Every meal must take 30 minutes or less to cook.");
  }

  const prompt = `The user has these ingredients available: ${availableIngredients.join(", ")}.
Suggest ${count} different meals they could cook, preferring meals that need few or no extra ingredients.
${constraints.length > 0 ? `\nMust follow:\n${constraints.join("\n")}\n` : ""}
Respond with ONLY a single JSON object, no other text, in exactly this shape:
{ "meals": [ string, string, ... ] }
Each item is just the name of the meal. Do not include recipes, ingredients or descriptions.`;

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a helpful cooking assistant. Always respond with a single valid JSON object and nothing else - no markdown, no commentary.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter request failed (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const content = data.choices?.[0]?.message?.content;

  if (typeof content !== "string") {
    throw new Error("OpenRouter response did not contain message content");
  }

  const parsed = JSON.parse(content) as { meals?: unknown };

  if (!Array.isArray(parsed.meals)) {
    throw new Error("AI response was missing the meals array");
  }

  return parsed.meals
    .filter((meal): meal is string => typeof meal === "string" && meal.trim().length > 0)
    .map((meal) => meal.trim());
};
