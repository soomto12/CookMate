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
export declare const generateRecipe: (mealName: string, availableIngredients: string[]) => Promise<GeneratedRecipe>;
//# sourceMappingURL=recipeGeneration.d.ts.map