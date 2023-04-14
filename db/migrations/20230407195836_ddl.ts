import { Knex } from 'knex';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
console.log(`db: ${process.env.PGDATABASE}`);

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropSchemaIfExists('recipes', true);
  await knex.schema.createSchema('recipes');
  await knex.schema.withSchema('recipes').createTable('recipe', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('image').notNullable();
    table.string('preparation').notNullable();
    table.string('difficulty').notNullable();
    table.string('time').notNullable();
    table.string('servings').notNullable();
    table.datetime('created_at').notNullable().defaultTo(knex.fn.now());
    table.datetime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
  await knex.schema.withSchema('recipes').createTable('ingredient', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('image').notNullable();
    table.datetime('created_at').notNullable().defaultTo(knex.fn.now());
    table.datetime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
  await knex.schema.withSchema('recipes').createTable('recipe_ingredient', (table) => {
    table.increments('id').primary();
    table.integer('recipe_id').notNullable().references('id').inTable('recipes.recipe');
    table.integer('ingredient_id').notNullable().references('id').inTable('recipes.ingredient');
    table.string('quantity').notNullable();
    table.datetime('created_at').notNullable().defaultTo(knex.fn.now());
    table.datetime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
  await knex.schema.withSchema('recipes').createTable('user', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.datetime('created_at').notNullable().defaultTo(knex.fn.now());
    table.datetime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
  await knex.schema.withSchema('recipes').createTable('user_recipe', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('recipes.user');
    table.integer('recipe_id').notNullable().references('id').inTable('recipes.recipe');
    table.datetime('created_at').notNullable().defaultTo(knex.fn.now());
    table.datetime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
  await knex.schema.withSchema('recipes').createTable('category', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.datetime('created_at').notNullable().defaultTo(knex.fn.now());
    table.datetime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
  await knex.schema.withSchema('recipes').createTable('recipe_category', (table) => {
    table.increments('id').primary();
    table.integer('recipe_id').notNullable().references('id').inTable('recipes.recipe');
    table.integer('category_id').notNullable().references('id').inTable('recipes.category');
    table.datetime('created_at').notNullable().defaultTo(knex.fn.now());
    table.datetime('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropSchemaIfExists('recipes', true);
}

