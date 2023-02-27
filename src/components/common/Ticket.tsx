import red from "@/images/red.svg"
import purple from "@/images/purple.svg"
import green from "@/images/green.svg"

import Image from "next/image"


export function Ticket({ nickname, background }: { nickname: string; background: number }) {

  function BGImg() {
    if (background === 0) {
      return red
    } else if (background === 1) {
      return purple
    } else if (background === 2){
      return green
    }
  }


  return (
    <div className="relative">
      <div
        style={{ bottom: nickname.length <= 13 ? "4.95rem" : "5.1rem" }}
        className="absolute bottom-1 left-1/2 -translate-x-1/2 z-20 "
      >
        <p
          style={{ width: "15rem", fontSize: nickname.length <= 13 ? "1.9rem" : "1.45rem", lineHeight: "2.5rem" }}
          className="text-black font-welcome text-center"
        >
          {nickname.length <= 18 ? nickname : nickname.slice(0, 18) + "..."}
        </p>
      </div>

      {/* width={624} height={1300} */}
      <Image src={BGImg()} alt="bg" />

      <div style={{ right: "2.25rem", bottom: "4rem" }} className="absolute">

      </div>
    </div>
  )
}
