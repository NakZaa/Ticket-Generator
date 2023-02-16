import { Button, LinkButton } from "@/components/common/Button"
import { useAuth } from "@/lib/auth"
import { useEffect } from "react"
import { motion } from "framer-motion"

import ChevRonLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon"
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon"
import DownloadIcon from "@heroicons/react/24/solid/ArrowDownTrayIcon"
import SignOutIcon from "@heroicons/react/24/solid/ArrowLeftOnRectangleIcon"
import MapIcon from "@heroicons/react/24/solid/MapIcon"
import { Ticket } from "@/components/common/Ticket"

export default function Card() {
    const auth = useAuth()

    useEffect(() => {
        auth?.requireCred("/register")
        auth?.requireUser("/registerform")
    }, [])

    return (
        <div className="bg-pink-100 min-h-screen flex flex-col justify-center items-center pt-20 sm:pt-6 pb-20 font-display">
            <div className="flex justify-end absolute top-0 w-full z-50 p-6">
                <Button
                    onClick={() => {
                        auth?.signout("/")
                    }}
                    type="white"
                    className="shadow-md w-[10rem] px-0 py-3 text-sm flex gap-1 justify-center items-center"
                >
                    <SignOutIcon className="w-5 h-5 text-pink-500" />
                    <span>ออกจากระบบ</span>
                </Button>
            </div>

            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Ticket
                    nickname={(auth?.user?.nickname as string) ?? ""}
                    uid={(auth?.credential?.uid as string) ?? ""}
                />
            </motion.div>

            <section className="grid grid-cols-1 mt-4 max-w-xs w-full">
                <Button
                    onClick={() => {
                        // download from /api/og
                        const a = document.createElement("a")
                        a.href = `/api/og?name=${auth?.user?.nickname}`
                        a.download = "niti.png"
                        a.click()
                    }}
                    type="white"
                    className="shadow-md px-0 py-3 w-full flex gap-1 justify-center items-center"
                >
                    <DownloadIcon className="w-6 h-6 text-pink-500" />
                    <span>ดาวน์โหลด</span>
                </Button>
            </section>
        </div>
    )
}