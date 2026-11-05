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
export declare const generateRecipe: (mealName: string, availableIngredients: string[], id: string | undefined, preferences?: RecipePreferences) => Promise<GeneratedRecipe>;
export declare const generateIngredients: (mealName: string) => Promise<GeneratedIngredient[]>;
export interface MealSuggestionOptions {
    count?: number;
}
export declare const suggestMeals: (availableIngredients: string[], options?: MealSuggestionOptions) => Promise<string[]>;
//# sourceMappingURL=recipeGeneration.d.ts.map