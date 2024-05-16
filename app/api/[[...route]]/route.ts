import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import accounts from "./accounts"
import { HTTPException } from 'hono/http-exception';

// either runtime works
// export const runtime = 'nodejs'
export const runtime = 'edge';

const app = new Hono().basePath('/api')

app.onError((err, c) => {
    if(err instanceof HTTPException) {
        return err.getResponse(); 
    }
    // standardize error response (improves type safety in client code)
    return c.json({ err: "Internal Server Error" }, 500)
})

const routes = app
    .route('/accounts', accounts)


export default app

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes; 