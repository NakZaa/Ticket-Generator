import { useAuth } from "@/lib/auth"
import { validateForm } from "@/lib/validate"
import { TextField } from "@/components/common/TextField"
import { SelectField } from "@/components/common/SelectField"
import faculties from "@/data/faculties"

import { Formik, Form } from "formik"
import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function RegisterForm() {
  const auth = useAuth()

  if (!auth) {
    return
  }

  useEffect(() => {
    auth?.requireCred("/register")
    auth?.requireNotUser("/card")
  }, [auth])

  const handleSubmit = async ({
    nickname,
    name,
    status,
    faculty,
    school,
    year,
    syear,
    background,
  }: {
    nickname: string
    name: string
    status: string
    faculty: string
    school: string
    year: string
    syear: string
    background: string
  }) => {
    await auth.createUser({
      faculty,
      name,
      nickname,
      school,
      status: status as "participant" | "alumni" | "student",
      year: +year,
      syear,
      background: Math.floor(Math.random() * 3),
    })
  }

  return (
    <div className="bg-neutral-50 font-display min-h-screen w-full">
      <main className="text-[#5F207A] mx-auto max-w-lg">
        <div className="flex flex-col items-center justify-center h-screen gap-6 px-6">
          <div>
            <Image src="/assets/LawOph.PNG" alt="Law Chula Open House logo" width="128" height="128" />
          </div>
          <h1 className="text-center text-3xl">Register</h1>
          <Formik
            initialValues={{
              nickname: "",
              name: "",
              status: "",
              faculty: "",
              school: "",
              year: "",
              syear: "",
              background: "",
            }}
            validate={validateForm}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true)

              await handleSubmit(values)

              setSubmitting(false)
            }}
          >
            {({ isSubmitting, values }) => (
              <Form className="flex flex-col gap-3 font-semibold text-[#5F207A] w-full max-w-sm">
                <div className="flex items-center gap-2 w-full justify-end">
                  <button
                    className="underline hover:no-underline hover:text-[#832ca9] text-[#5F207A] transition-all"
                    onClick={() => {
                      auth?.signout("/register")
                    }}
                  >
                    ออกจากระบบ
                  </button>
                </div>
                <TextField fieldName="name" fieldLabel="ชื่อ-สกุล" placeholder="John Doe" className="text-gray-800" />
                <TextField
                  fieldName="nickname"
                  fieldLabel="ชื่อที่ต้องการให้ระบุในตั๋ว"
                  placeholder="username"
                  className="text-gray-800"
                />
                <SelectField
                  fieldLabel="สถานภาพ"
                  fieldName="status"
                  options={[
                    ["นักเรียน", "participant"],
                    ["นิสิตปัจจุบัน", "student"],
                    ["ศิษย์เก่า", "alumni"],
                  ]}
                  placeholder="เลือกสถานภาพ"
                  className="text-gray-800"
                />
                {values.status === "student" && (
                  <>
                    <AnimatePresence>
                      {/* seperate motion.div because it count as one flex item so gap does not apply */}
                      <motion.div key="faculty-motion" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                        <SelectField
                          fieldLabel="คณะ"
                          fieldName="faculty"
                          options={faculties.map((faculty) => [faculty, faculty])}
                          placeholder="คณะ"
                          className="text-gray-800"
                        />
                      </motion.div>
                      <motion.div key="year-motion" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                        {/* <TextField fieldName="year" fieldLabel="ชั้นปี" className="w-1/5" /> */}
                        <SelectField
                          fieldLabel="ชั้นปี"
                          fieldName="year"
                          options={[
                            ["1", "1"],
                            ["2", "2"],
                            ["3", "3"],
                            ["4", "4"],
                            ["5", "5"],
                            ["6", "6"],
                          ]}
                          placeholder="ปี"
                          className="w-3/12 text-gray-800"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </>
                )}
                {values.status === "participant" && (
                  <>
                    <AnimatePresence>
                      {/* seperate motion.div because it count as one flex item so gap does not apply */}
                      <motion.div key="school-motion" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                        <TextField
                          fieldLabel="โรงเรียน"
                          fieldName="school"
                          placeholder="โรงเรียน"
                          className="text-gray-800"
                        />
                      </motion.div>
                      <motion.div key="syear-motion" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                        <SelectField
                          fieldLabel="ระดับการศึกษา"
                          fieldName="syear"
                          options={[
                            ["ประถมศึกษา", "primary school"],
                            ["มัธยมศึกษาตอนต้น", "middle school"],
                            ["ม.4", "M.4"],
                            ["ม.5", "M.5"],
                            ["ม.6", "M.6"],
                            ["อื่น ๆ", "others"],
                          ]}
                          placeholder="ระดับชั้น"
                          className="w-3/12 text-gray-800"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || !auth?.credential}
                  className="w-full mt-6 py-2 px-6 bg-[#5f207a] text-white transition-colors hover:bg-[#832ca9] shadow-md rounded-xl "
                >
                  ถัดไป
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  )
}
