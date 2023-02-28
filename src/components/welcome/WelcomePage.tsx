import LCO from "@/images/LCO.png"
import Welcome from "@/images/welcome/WelcomeSign.png"
import OneTop from "@/images/welcome/onetop.png"
import OneBot from "@/images/welcome/onebot.png"
import TwoTop from "@/images/welcome/twotop.png"
import TwoBot from "@/images/welcome/twobot.png"

import Image from "next/image"
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { LinkButton } from "../common/Button"

const AnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.75, transition: "easeInOut" },
}

const FlyInProps = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
  transition: { duration: 1.5, transition: "easeInOut" },
}

export function PageRenderer({ page, setPage }: { page: number; setPage: Dispatch<SetStateAction<number>> }) {
  const timeOutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (page === -1 || page === 4) {
      timeOutRef.current = setTimeout(() => {
        setPage(page + 1)
      }, 2000)
    }

    return () => {
      clearTimeout(timeOutRef.current)
    }
  }, [page])

  switch (page) {
    case 0: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center cursor-pointer font-welcome"
          onClick={() => setPage((page) => page + 1)}
        >
          <button className="relative transition-opacity text-4xl leading-relaxed max-w-sm">
            <div className="absolute -top-24 -left-5">
              <Image src={OneTop} alt="shooting stars" width="128" height="128" />
            </div>
            <div className="pb-16">Getting deep into something</div>
            <div>Ending up somewhere strange</div>
            <div className="absolute -bottom-14 -right-4">
              <Image src={OneBot} alt="shooting stars" width="128" height="128" />
            </div>
          </button>
        </div>
      )
    }
    case 1: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center cursor-pointer font-welcome"
          onClick={() => setPage(page + 1)}
        >
          <p className="relative text-center text-4xl leading-loose max-w-sm">
            <div className="absolute -top-24 -left-10">
              <Image src={TwoTop} alt="shooting stars" width="128" height="128" />
            </div>
            Greetings from <br />
            Law Chula
            <div className="absolute -bottom-16 right-8">
              <Image src={TwoBot} alt="shooting stars" width="128" height="128" />
            </div>
          </p>
        </div>
      )
    }
    case 2: {
      return (
        <div
          className="flex flex-col h-full justify-center items-center cursor-pointer font-welcome"
          onClick={() => setPage(page + 1)}
        >
          <p className=" text-center text-3xl leading-loose max-w-sm">
            Down the Rabbit Hole to
            <br />
            <p className="font-wild">LEGAL LAND</p>
          </p>
          <div>
            <Image src={Welcome} alt="Law Chula Open House" width="128" height="128" className="pt-6" />
          </div>
        </div>
      )
    }
    case 3: {
      return (
        <LinkButton
          href="/card"
          type="secondary"
          className="flex flex-col h-full justify-center items-center w-full cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 65,
              damping: 20,
              delay: 0.5,
            }}
            className="w-full max-w-xl"
          >
            <Image src={LCO} alt="Law Chula Open House" />
          </motion.div>
        </LinkButton>
      )
    }
    default: {
      return null
    }
  }
}

export function AnimationWrapper({ page, children }: { page: number; children: ReactNode }) {
  return (
    <motion.div {...AnimationProps} key={page} className="h-full">
      {children}
    </motion.div>
  )
}
