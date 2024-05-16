import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import accounts from "./accounts"
import test from "./test"

// either runtime works
// export const runtime = 'nodejs'
export const runtime = 'edge';

const app = new Hono().basePath('/api')



const routes = app
    .route('/accounts', accounts)
    .route('/test', test)


export default app

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes; 