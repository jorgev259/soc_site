/* import type { ActionResponse, ErrorWithMessage } from '@/server/types'

// Modified from: https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  )
}

export function coerceError(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError

  try {
    return new Error(JSON.stringify(maybeError))
  } catch {
    return new Error(String(maybeError))
  }
}

export function handleFormError(maybeError: unknown): ActionResponse {
  const error = coerceError(maybeError)

  return {
    ok: false,
    error: error.message
  }
} */
