import { User as FirebaseUser } from "firebase/auth"
import { createUser as dbCreateUser, getCurrentUserData, getUserRef, updateUser } from "./db"
import { deleteField } from "firebase/firestore"

export interface UserCreateBody {
  faculty: string
  school: string
  name: string
  nickname: string
  status: "student" | "alumni" | "participant"
  year: number
  syear: string
  background: number
}

export interface User extends UserCreateBody {
  email: string
}

export const createUser = async (credential: FirebaseUser, createBody: UserCreateBody) => {
  dbCreateUser(credential.uid, {
    email: credential.email,
    ...createBody,
  })
}

export const getUser: (credential: FirebaseUser) => Promise<null | User> = async (credential: FirebaseUser) => {
  return (await getCurrentUserData(credential.uid)) as User
}

export const getUserByID = async (uid: string): Promise<null | User> => {
  return (await getCurrentUserData(uid)) as User
}

export const getUserDoc = (credential: FirebaseUser) => {
  return getUserRef(credential.uid)
}

export const addPurpose: (credential: FirebaseUser, purpose: string) => Promise<void> = async (
  credential: FirebaseUser,
  purpose: string
) => {
  return await updateUser(credential.uid, { purpose })
}

