import { useAuth } from "@/lib/auth"
import { AnimationWrapper, PageRenderer } from "@/components/welcome/WelcomePage"

import { useCallback, useEffect, useState } from "react"
import clsx from "clsx"
import { useRouter } from "next/router"


export default function Welcome() {
  const [page, setPage] = useState(0)

  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    auth?.requireNotCred("/registerform")
    auth?.requireNotUser("/card")
}, [router])

  const getBG = useCallback(
    (page: number) => {
      if (page === 0) return "bg-black text-white"
      else if (page >= 1 && page <= 4) return "bg-black text-white"
      else if (page >= 5 ) return "bg-white text-black"

      return "bg-black text-white"
    },
    [page]
  )


  return (
    <div className={clsx("h-screen overflow-hidden", getBG(page))}>
      <main className="mx-auto h-full relative max-w-lg font-display">
        <AnimationWrapper page={page}>
          <PageRenderer
            page={page}
            setPage={setPage}
          />
        </AnimationWrapper>
      </main>
    </div>
  )
}
