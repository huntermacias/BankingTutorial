import { NextResponse, NextRequest } from "next/server"

export const GET = (
    request: NextRequest,
    // the 'parmas' object name is based on the folder name
    { params }: { params: { testId: string } }
) => {
    return NextResponse.json({
        message: "Hello, World!",
        testId: params.testId
    })
}