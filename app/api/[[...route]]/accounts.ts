import { db } from '@/db/drizzle';
import { accounts, insertAccountSchema } from '@/db/schema';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { eq, and, inArray } from 'drizzle-orm';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { createId } from "@paralleldrive/cuid2"
import { z } from 'zod';

// File Description: 
// This file is the API route for the accounts endpoint. 
// It fetches all accounts from the database and returns them as JSON.

const app = new Hono()
    // get endpoint for fetching accounts
    .get("/",
        clerkMiddleware(),
        async (c) => {
            // get authenticated user
            const auth = getAuth(c);

            if (!auth?.userId) {
                return c.json({ error: 'User Not Authenticated' }, 401);

            }

            // fetch accounts from database
            const data = await db
                .select({
                    id: accounts.id,
                    name: accounts.name,
                })
                .from(accounts)
                .where(eq(accounts.userId, auth.userId))



            return c.json({ data })
        })
    .get("/:id",
        zValidator("param", z.object({
            id: z.string().optional(),
        })),
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);
            const { id } = c.req.valid('param');
            if (!id) {
                return c.json({ error: 'Missing ID' }, 400);
            }
            if (!auth?.userId) {
                return c.json({ error: 'User Not Authenticated' }, 401);
            }

            const [data] = await db.select({
                id: accounts.id,
                name: accounts.name,
            })
                .from(accounts)
                .where(
                    and(
                        eq(accounts.userId, auth.userId),
                        eq(accounts.id, id)
                    )
                )
            if (!data) {
                return c.json({ error: 'Account Not Found' }, 404);
            }
            return c.json({ data });
        }
    )
    // post endpoint for creating a new account
    .post("/",
        clerkMiddleware(),
        // use zValidator to validate what kind of data is being sent
        zValidator("json", insertAccountSchema.pick({
            name: true,
        })),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid('json');
            if (!auth?.userId) {
                return c.json({ error: 'User Not Authenticated' }, 401);
            }
            // .insert() doesn't return data by default, so we use .returning() to get the data
            const [data] = await db.insert(accounts).values({
                id: createId(),
                userId: auth.userId,
                ...values,
            }).returning()

            return c.json({ data })
        })
    // post endpoint for deleting an account
    .post('/bulk-delete',
        clerkMiddleware(),
        zValidator("json", z.object({
            ids: z.array(z.string()),
        }),
        ),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid('json');

            if (!auth?.userId) {
                return c.json({ error: 'User Not Authenticated' }, 401);
            }
            const data = await db.delete(accounts)
                .where(
                    and(
                        eq(accounts.userId, auth.userId),
                        inArray(accounts.id, values.ids)
                    )
                )
                .returning({
                    id: accounts.id,
                })
            return c.json({ data })
        }
    );

export default app;