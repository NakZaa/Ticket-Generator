import { Button } from "@/components/common/Button"
import { useAuth } from "@/lib/auth"
import GoogleIcon from "@/vectors/icons/google"

import { useEffect } from "react"

export default function Register() {
  const auth = useAuth()

  useEffect(() => {
    auth?.requireNotCred("/registerform")
    auth?.requireNotUser("/card")
  }, [])

  return (
    <div className="bg-vlvu-pink-100 font-display min-h-screen w-full">
      <main className="mx-auto max-w-lg">
        <div className="flex flex-col items-center justify-center h-screen gap-6">
          <div className="flex flex-col gap-3">
            <Button
              type="purple"
              onClick={() => {
                auth?.signinWithGoogle("/registerform")
              }}
              className="flex gap-3 px-8 py-3 items-center shadow-md content-start"
            >
              <GoogleIcon height="32" width="32" />
              <span className="grow text-start text-lg font-semibold">Sign in with Google</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
