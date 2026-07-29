"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRecipe = void 0;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const buildPrompt = (mealName, availableIngredients) => {
    const availableList = availableIngredients.length > 0 ? availableIngredients.join(", ") : "nothing in particular";
    return `The user wants to cook: "${mealName}".
They currently have these ingredients available: ${availableList}.

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
const generateRecipe = async (mealName, availableIngredients) => {
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
                    content: "You are a precise recipe-writing assistant. Always respond with a single valid JSON object and nothing else - no markdown, no commentary.",
                },
                { role: "user", content: buildPrompt(mealName, availableIngredients) },
            ],
        }),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter request failed (${response.status}): ${errorText}`);
    }
    const data = (await response.json());
    const content = data.choices?.[0]?.message?.content;
    if (typeof content !== "string") {
        throw new Error("OpenRouter response did not contain message content");
    }
    const parsed = JSON.parse(content);
    if (!parsed.title || !Array.isArray(parsed.ingredients) || !Array.isArray(parsed.steps)) {
        throw new Error("AI response was missing required recipe fields");
    }
    const validDifficulties = ["EASY", "MEDIUM", "HARD"];
    const difficulty = validDifficulties.includes(parsed.difficulty)
        ? parsed.difficulty
        : null;
    const cookTimeMinutes = typeof parsed.cookTimeMinutes === "number" && Number.isFinite(parsed.cookTimeMinutes)
        ? parsed.cookTimeMinutes
        : null;
    return { ...parsed, difficulty, cookTimeMinutes };
};
exports.generateRecipe = generateRecipe;
//# sourceMappingURL=recipeGeneration.js.map