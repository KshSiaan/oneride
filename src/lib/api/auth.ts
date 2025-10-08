import { howl } from "../utils"

// >>>>>>>>>>>>>> AUTH >>>>>>>>>>>>>>>>>>

export const loginApi = async (body: { email: string, password: string }) => {
  return howl("/auth/login", { method: "POST", body })
}

export const registerApi = async (body: { email: string, password: string, passwordConfirm: string }) => {
  return howl("/auth/signup", { method: "POST", body })
}

export const sendOtpApi = async (body: { email: string }) => {
  return howl("/auth/send-otp", { method: "POST", body })
}

export const verifyEmailApi = async (body: { email: string; emailVerifyCode: string }) => {
  return howl("/auth/verify-email", { method: "POST", body })
}

export const resetPasswordApi = async (body: 
  { password: string; 
    confirmPassword: string }, 
    token: string) => {
  return howl("/auth/reset-password", { method: "POST", body, token })
}

export const changePasswordApi = async (body: { newPassword: string; confirmNewPassword: string; oldPassword: string }, token: string) => {
  return howl("/auth/change-password", { method: "POST", body, token })
}
