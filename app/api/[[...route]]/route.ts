import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'


export const runtime = 'edge';

const app = new Hono().basePath('/api')

app
    .get('/hello',
        clerkMiddleware(),
        (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) {
                return c.json({
                    message: 'Hello Next.js! You are not authenticated',
                })
            }

            return c.json({
                message: 'Hello Next.js! You are authenticated',
            })
        })




export const GET = handle(app)
export const POST = handle(app)