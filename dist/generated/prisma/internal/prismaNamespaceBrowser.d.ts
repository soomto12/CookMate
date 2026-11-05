import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: 'User';
    readonly Recipe: 'Recipe';
    readonly RecipeIngredient: 'RecipeIngredient';
    readonly RecipeStep: 'RecipeStep';
    readonly ShoppingList: 'ShoppingList';
    readonly ShoppingListItem: 'ShoppingListItem';
    readonly Allergen: 'Allergen';
    readonly Food: 'Food';
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: 'ReadUncommitted';
    readonly ReadCommitted: 'ReadCommitted';
    readonly RepeatableRead: 'RepeatableRead';
    readonly Serializable: 'Serializable';
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly email: 'email';
    readonly password: 'password';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const RecipeScalarFieldEnum: {
    readonly id: 'id';
    readonly title: 'title';
    readonly description: 'description';
    readonly cuisine: 'cuisine';
    readonly servings: 'servings';
    readonly cookTimeMinutes: 'cookTimeMinutes';
    readonly difficulty: 'difficulty';
    readonly imageUrl: 'imageUrl';
    readonly imageCredit: 'imageCredit';
    readonly imageCreditUrl: 'imageCreditUrl';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
    readonly createdById: 'createdById';
};
export type RecipeScalarFieldEnum = (typeof RecipeScalarFieldEnum)[keyof typeof RecipeScalarFieldEnum];
export declare const RecipeIngredientScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly quantity: 'quantity';
    readonly unit: 'unit';
    readonly recipeId: 'recipeId';
};
export type RecipeIngredientScalarFieldEnum = (typeof RecipeIngredientScalarFieldEnum)[keyof typeof RecipeIngredientScalarFieldEnum];
export declare const RecipeStepScalarFieldEnum: {
    readonly id: 'id';
    readonly order: 'order';
    readonly instruction: 'instruction';
    readonly recipeId: 'recipeId';
};
export type RecipeStepScalarFieldEnum = (typeof RecipeStepScalarFieldEnum)[keyof typeof RecipeStepScalarFieldEnum];
export declare const ShoppingListScalarFieldEnum: {
    readonly id: 'id';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
    readonly userId: 'userId';
    readonly recipeId: 'recipeId';
};
export type ShoppingListScalarFieldEnum = (typeof ShoppingListScalarFieldEnum)[keyof typeof ShoppingListScalarFieldEnum];
export declare const ShoppingListItemScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly quantity: 'quantity';
    readonly unit: 'unit';
    readonly purchased: 'purchased';
    readonly createdAt: 'createdAt';
    readonly shoppingListId: 'shoppingListId';
};
export type ShoppingListItemScalarFieldEnum = (typeof ShoppingListItemScalarFieldEnum)[keyof typeof ShoppingListItemScalarFieldEnum];
export declare const AllergenScalarFieldEnum: {
    readonly id: 'id';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
    readonly userId: 'userId';
};
export type AllergenScalarFieldEnum = (typeof AllergenScalarFieldEnum)[keyof typeof AllergenScalarFieldEnum];
export declare const FoodScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type FoodScalarFieldEnum = (typeof FoodScalarFieldEnum)[keyof typeof FoodScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: 'asc';
    readonly desc: 'desc';
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: 'default';
    readonly insensitive: 'insensitive';
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: 'first';
    readonly last: 'last';
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map