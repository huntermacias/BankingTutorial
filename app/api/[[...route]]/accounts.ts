import { db } from '@/db/drizzle';
import { accounts } from '@/db/schema';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { HTTPException } from "hono/http-exception";

// File Description: 
// This file is the API route for the accounts endpoint. 
// It fetches all accounts from the database and returns them as JSON.

const app = new Hono()
    // accounts route
    .get("/", 
    clerkMiddleware(),
    async (c) => {
        // get authenticated user
        const auth = getAuth(c); 

        // error handling option 1&2
        if(!auth?.userId) {
            // return c.json({ error: 'Not authenticated' }, 401);
            throw new HTTPException(401, 
                { res: c.json({ error: 'User Not Authenticated'}, 401)
            })
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

export default app;