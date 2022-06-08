import type { ValidationError } from 'src/types/error'
import type { Either } from 'src/utils/either'
import { fail, success } from 'src/utils/either'
import { mapValidationResponse } from 'src/utils/map-checkable-response'
import { request } from '../index'

export interface PostRegisterForm {
  email: string
  password: string
  username: string
}

export type PostRegisterErrors = Partial<Record<keyof PostRegisterForm, string[]>>

export async function postRegister (form: PostRegisterForm): Promise<Either<ValidationError<PostRegisterErrors>, User>> {
  const result1 = await request.checkablePost<UserResponse>('/users', { user: form })
  const result2 = mapValidationResponse<PostRegisterErrors, UserResponse>(result1)

  if (result2.isOk()) return success(result2.value.user)
  else return fail(result2.value)
}
