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
export declare const generateRecipe: (mealName: string, availableIngredients: string[], preferences?: RecipePreferences) => Promise<GeneratedRecipe>;
//# sourceMappingURL=recipeGeneration.d.ts.map