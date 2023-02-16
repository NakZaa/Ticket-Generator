import ticketBGImg from "@/images/bg.svg"
import Image from "next/image"

export function Ticket({ nickname, uid }: { nickname: string; uid: string }) {
  return (
    <div className="relative">
      <div
        style={{ top: nickname.length <= 13 ? "5.65rem" : "5.8rem" }}
        className="absolute left-1/2 -translate-x-1/2 z-20"
      >
        <p
          style={{ width: "15rem", fontSize: nickname.length <= 13 ? "1.9rem" : "1.45rem", lineHeight: "2.5rem" }}
          className="text-[#C697C5] font-bold font-name text-center"
        >
          {nickname.length <= 18 ? nickname : nickname.slice(0, 18) + "..."}
        </p>
      </div>

      {/* width={624} height={1300} */}
      <Image src={ticketBGImg} alt="bg" />

      <div style={{ right: "2.25rem", bottom: "4rem" }} className="absolute">

      </div>
    </div>
  )
}
