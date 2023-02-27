import { ImageResponse } from "@vercel/og"
import { NextApiRequest, NextApiResponse } from "next"

export const config = {
  runtime: "experimental-edge",
}

const TimesNewRoman = fetch(new URL("../../fonts/times-new-roman.ttf", import.meta.url)).then((res) => res.arrayBuffer())

const RATIO = 1.3

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = new URL(req.url ?? "")
    const name = url.searchParams.get("name") ?? ""
    const background = url.searchParams.get("background") ?? ""

    console.log(name, background)

    const TimesNewRomanData = await TimesNewRoman

    return new ImageResponse(
      (
        <div tw="flex justify-center items-center w-full h-full">
          <div
            style={{ fontFamily: "Times New Roman", width: 1080, height: 1920 }}
            tw="text-6xl font-bold flex flex-col items-center justify-center text-center relative"
          >
            <div tw="absolute flex top-0 left-0">
              <img alt="bg" height={1920} width={1080} src={`${url.origin}/assets/${background}.png`} />
            </div>
            <div
              style={{
                zIndex: "50",
                bottom: name.length <= 13 ? 180 * RATIO : 190 * RATIO,
                left: "50%",
                transform: "translateX(-50%)",
              }}
              tw="flex absolute"
            >
              <p
                style={{
                  fontSize: name.length <= 13 ? 72 * RATIO : 64 * RATIO,
                }}
                tw="text-black"
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
            name: "Times New Roman",
            data: TimesNewRomanData,
            weight: 400,
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
