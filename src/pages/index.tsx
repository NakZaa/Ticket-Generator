import { LinkButton } from "@/components/common/Button"
import { easeInOut, motion } from "framer-motion"
import React, { useEffect } from "react"
import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/router"
import Link from "next/link"


function WelcomeText() {
    const initText = "Click Me"
    const [text, setText] = useState(initText)
    const auth = useAuth()
    const router = useRouter()

    useEffect(() => {
        auth?.requireNotUser("/card")
    }, [router])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={easeInOut}
            className="flex flex-col items-center justify-center gap-6 absolute z-30 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full"
        >
            <div>
                <h1 className="text-[2.7rem] text-center">Welcome!</h1>
                <p className="text-center text-[1.2rem] sm:text-lg mt-[7px]">Saparp</p>
            </div>

            <LinkButton
                href="/register"
                type="primary"
                className="text-2xl sm:text-lg py-2 px-14"
                onMouseOver={() => {
                    setText("Let's Go!")
                }}
                onMouseLeave={() => {
                    setText(initText)
                }}
            >
                {text}
            </LinkButton>
        </motion.div>
    )
}

export default function Index() {
    return (
        <div className="font-display min-h-screen w-full font-semibold overflow-hidden">
            <main className="mx-auto max-w-lg relative min-h-screen"><WelcomeText /></main>
        </div>
    );
};
