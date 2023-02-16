import { ImageResponse } from "@vercel/og"
import { NextApiRequest, NextApiResponse } from "next"

export const config = {
  runtime: "experimental-edge",
}

const RobotoSlab = fetch(new URL("../../fonts/RobotoSlab-Bold.ttf", import.meta.url)).then((res) => res.arrayBuffer())

const RATIO = 1.3

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = new URL(req.url ?? "")
    const name = url.searchParams.get("name") ?? ""

    const RobotoSlabData = await RobotoSlab

    return new ImageResponse(
      (
        <div tw="bg-[#FFF2F4] flex justify-center items-center w-full h-full">
          <div
            style={{ fontFamily: "Roboto Slab", width: 620 * RATIO, height: 920 * RATIO }}
            tw="text-6xl font-bold flex flex-col items-center justify-center text-center relative"
          >
            <div tw="absolute flex top-0 left-0">
              <img alt="bg" height={920 * RATIO} width={620 * RATIO} src={`${url.origin}/assets/bg.png`} />
            </div>
            <div
              style={{
                zIndex: "50",
                top: name.length <= 13 ? 140 * RATIO : 150 * RATIO,
                left: "50%",
                transform: "translateX(-50%)",
              }}
              tw="flex absolute"
            >
              <p
                style={{
                  fontSize: name.length <= 13 ? 64 * RATIO : 42 * RATIO,
                }}
                tw="text-[#C697C5]"
              >
                {name.length <= 18 ? name : name.slice(0, 18) + "..."}
              </p>
            </div>
          </div>
        </div>
      ),
      {
        width: 1080,
        height: 1920,
        fonts: [
          {
            name: "Roboto Slab",
            data: RobotoSlabData,
            weight: 600,
            style: "normal",
          },
        ],
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          "Access-Control-Allow-Headers":
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
      }
    )
  } catch (e: any) {
    console.error(`ERROR : ${e.message}`)
    return new Response(`Failed to generate the image:\n${e.message}`, {
      status: 500,
    })
  }
}
