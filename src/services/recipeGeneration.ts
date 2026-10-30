const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
import { userAllergen , allergen} from "./userallergen";
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


let  COMMON_ALLERGENS : allergen[] = []



const buildPrompt = async (
  mealName: string,
  availableIngredients: string[],
  preferences: RecipePreferences,
) => {
  const availableList =
    availableIngredients.length > 0 ? availableIngredients.join(", ") : "nothing in particular";

  const constraints: string[] = [];

  if (preferences.excludeCommonAllergens) {
    constraints.push(
      `Do not use any of these allergens, including ingredients that contain them (e.g. sauces, stocks, or spreads):  ${COMMON_ALLERGENS.join(" ,")}.`,
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

   const allergenData = await userAllergen(id)
    COMMON_ALLERGENS = allergenData

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
        { role: "user", content: buildPrompt(mealName, availableIngredients, preferences) },
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
