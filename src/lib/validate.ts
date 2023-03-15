export const validateForm = (values: { [field: string]: string }) => {
  const errors: any = {}

  if (values.status === "") {
    errors.status = "กรุณาเลือกสถานภาพ"
  } else if (values.status === "student") {
    if (values.faculty === "") {
      errors.faculty = "กรุณาเลือกคณะ"
    } 
    
    if (+values.year < 1 || +values.year > 6) {
      errors.year = "ชั้นปีไม่ถูกต้อง"
    }
  } else if (values.status === "participant") {
    if (values.school === "") {
      errors.school = "กรุณาใส่โรงเรียน"
    }

    if (values.syear === "") {
      errors.syear = "กรุณาเลือกชั้น"
    }
  }

  if (values.name === "") {
    errors.name = "กรุณาใส่ชื่อ"
  }

  if (values.nickname === "") {
    errors.nickname = "กรุณาใส่ชื่อเล่น"
  }

  return errors
}
