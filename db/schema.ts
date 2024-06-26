import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod"; 

export const accounts = pgTable('accounts', {
    id: text('id').primaryKey(),
    plaidId: text('plaid_id'),
    name: text('name').notNull(),
    userId: text('user_id').notNull(),
})

// scheam for inserting a user - can be used to validate API req. 
export const insertAccountSchema = createInsertSchema(accounts);
