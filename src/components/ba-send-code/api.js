import { request } from '@/utils/request'

// export const api_sendSms = payload => request('/api/login/mobileSms', payload)

// export const api_sendEms = payload => request('/api/login/emailVerify', payload)

export const api_sendSmsByImage = payload => request('/api/login/verify', payload)

export const api_sendSms = payload => request('/api/login/verifyNew', payload)