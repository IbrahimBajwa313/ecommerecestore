// app/api/uploads/products/[filename]/route.ts

import { join } from "path"
import { existsSync, readFileSync } from "fs"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { filename: string } }
) {
  const { filename } = params
  const filepath = join(process.cwd(), "uploads", "products", filename)

  if (!existsSync(filepath)) {
    return new NextResponse("File not found", { status: 404 })
  }

  const file = readFileSync(filepath)
  const extension = filename.split(".").pop()
  const contentType = `image/${extension === "jpg" ? "jpeg" : extension}`

  return new NextResponse(file, {
    headers: {
      "Content-Type": contentType,
    },
  })
}
