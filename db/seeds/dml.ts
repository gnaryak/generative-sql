import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('recipes.recipe_ingredient').del();
    await knex('recipes.user_recipe').del();
    await knex('recipes.recipe_category').del();
    await knex('recipes.recipe').del();
    await knex('recipes.ingredient').del();
    await knex('recipes.user').del();
    await knex('recipes.category').del();

    // Inserts seed entries

    await knex('recipes.recipe').insert([
        {
            id: 1,
            name: 'Pancakes',
            description: 'Delicious pancakes',
            image: 'https://www.something.com/image.jpg',
            preparation: 'Mix all ingredients together and bake for 30 minutes at 350 degrees.',
            difficulty: 'Easy',
            time: '30 minutes',
            servings: '4'
        },
        {
            id: 2,
            name: 'Waffles',
            description: 'Delicious waffles',
            image: 'https://www.something.com/image.jpg',
            preparation: 'Mix all ingredients together and bake for 30 minutes at 350 degrees.',
            difficulty: 'Easy',
            time: '30 minutes',
            servings: '4'
        },
        {
            id: 3,
            name: 'Shakshuka',
            description: 'Delicious shakshuka',
            image: 'https://www.something.com/image.jpg',
            preparation: 'Mix all ingredients together and bake for 30 minutes at 350 degrees.',
            difficulty: 'Easy',
            time: '30 minutes',
            servings: '4'
        },
        {
            id: 4,
            name: 'Apple Pie',
            description: 'Delicious apple pie',
            image: 'https://www.something.com/image.jpg',
            preparation: 'Mix all ingredients together and bake for 30 minutes at 350 degrees.',
            difficulty: 'Easy',
            time: '30 minutes',
            servings: '4'
        },
        {
            id: 5,
            name: 'Chips and Salsa',
            description: 'Delicious chips and salsa',
            image: 'https://www.something.com/image.jpg',
            preparation: 'Mix all ingredients together and bake for 30 minutes at 350 degrees.',
            difficulty: 'Easy',
            time: '30 minutes',
            servings: '4'
        },
    ]);

    await knex('recipes.ingredient').insert([
        {
            id: 1,
            name: 'Flour',
            description: 'Flour',
            image: 'https://www.something.com/image.jpg',
        },
        {
            id: 2,
            name: 'Butter',
            description: 'Butter',
            image: 'https://www.something.com/image.jpg',
        },
        {
            id: 3,
            name: 'Apples',
            description: 'Apples',
            image: 'https://www.something.com/image.jpg',
        },
        {
            id: 4,
            name: 'Sugar',
            description: 'Sugar',
            image: 'https://www.something.com/image.jpg',
        },
        {
            id: 5,
            name: 'Chips',
            description: 'Chips',
            image: 'https://www.something.com/image.jpg',
        },
        {
            id: 6,
            name: 'Salsa',
            description: 'Salsa',
            image: 'https://www.something.com/image.jpg',
        },
        {
            id: 7,
            name: 'Eggs',
            description: 'Eggs',
            image: 'https://www.something.com/image.jpg',
        },
        {
            id: 8,
            name: 'Tomatoes',
            description: 'Tomatoes',
            image: 'https://www.something.com/image.jpg',
        },
        {
            id: 9,
            name: 'Milk',
            description: 'Milk',
            image: 'https://www.something.com/image.jpg',
        },
    ]);

    await knex('recipes.user').insert([
        {
            id: 1,
            name: 'Wolfgang Puck',
            email: 'user@domain.com',
            password: 'password',
        },
        {
            id: 2,
            name: 'Tracy',
            email: 'user@domain.com',
            password: 'password',
        },
    ]);

    await knex('recipes.category').insert([
        { id: 1, name: 'Breakfast' },
        { id: 2, name: 'Lunch' },
        { id: 3, name: 'Snack' },
        { id: 4, name: 'Vegetarian' },
        { id: 5, name: 'Keto' },
    ]);

    await knex('recipes.recipe_ingredient').insert([
        { recipe_id: 1, ingredient_id: 1, quantity: '1 cup' },
        { recipe_id: 1, ingredient_id: 2, quantity: '4 Tbsp' },
        { recipe_id: 1, ingredient_id: 7, quantity: '2' },
        { recipe_id: 1, ingredient_id: 9, quantity: '1 cup' },
        { recipe_id: 2, ingredient_id: 1, quantity: '1 cup' },
        { recipe_id: 2, ingredient_id: 2, quantity: '4 Tbsp' },
        { recipe_id: 2, ingredient_id: 7, quantity: '2' },
        { recipe_id: 2, ingredient_id: 9, quantity: '1 cup' },
        { recipe_id: 3, ingredient_id: 7, quantity: '4' },
        { recipe_id: 3, ingredient_id: 8, quantity: '6' },
        { recipe_id: 4, ingredient_id: 1, quantity: '2 cups' },
        { recipe_id: 4, ingredient_id: 2, quantity: '2 cups' },
        { recipe_id: 4, ingredient_id: 3, quantity: '6 cups' },
        { recipe_id: 4, ingredient_id: 4, quantity: '3/4 cup' },
        { recipe_id: 5, ingredient_id: 5, quantity: '1 bag' },
        { recipe_id: 5, ingredient_id: 6, quantity: '1 jar' },
    ]);

    await knex('recipes.user_recipe').insert([
        { user_id: 2, recipe_id: 1 },
        { user_id: 2, recipe_id: 2 },
        { user_id: 2, recipe_id: 3 },
        { user_id: 1, recipe_id: 4 },
        { user_id: 1, recipe_id: 5 },
    ]);

    await knex('recipes.recipe_category').insert([
        { recipe_id: 3, category_id: 5 },
        { recipe_id: 1, category_id: 4 },
        { recipe_id: 2, category_id: 4 },
        { recipe_id: 3, category_id: 4 },
        { recipe_id: 4, category_id: 4 },
        { recipe_id: 5, category_id: 4 },
        { recipe_id: 1, category_id: 1 },
        { recipe_id: 2, category_id: 1 },
        { recipe_id: 3, category_id: 1 },
        { recipe_id: 3, category_id: 2 },
        { recipe_id: 4, category_id: 3 },
        { recipe_id: 5, category_id: 3 },
    ]);
};
