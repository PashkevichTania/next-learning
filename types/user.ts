import { Role } from "@/types/index";

type BasicUser = {
  name: string
  email: string
  role: Role
}

export type CredentialsUser = BasicUser &  {
  password: string
}

export type FacebookUser = BasicUser & {
  id: string
  image: string
  accessToken: string
}

export type User = CredentialsUser | FacebookUser
