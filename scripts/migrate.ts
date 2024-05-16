import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from "drizzle-orm/neon-http/migrator";

// Load environment variables from .env file
config({ path: '.env' });

// Asserting non-null assertion for DATABASE_URL, this should be validated prior or handled appropriately
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    console.error("DATABASE_URL is not defined in the environment variables.");
    process.exit(1); // Exit if there is no database URL defined
}

const sql = neon(databaseUrl);
const db = drizzle(sql);

const main = async () => {
    try {
        await migrate(db, { migrationsFolder: 'drizzleMigrations' });
        console.log("Database migration completed successfully.");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error migrating database: ${error.message}`);
        } else {
            console.error("An unexpected error occurred during the database migration.");
        }
        process.exit(1); // Ensure the process exits with an error code
    }
};

main(); // Call the main function to perform the migration
