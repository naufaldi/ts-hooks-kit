import { useCallback, useEffect, useRef, useState } from 'react'

/** The validator function type. */
export type ValidatorFn<S> = (...states: S[]) => unknown

/** The hook return type. */
export type UseMultiStateValidatorReturn<V> = V

/**
 * Custom hook that validates multiple states at once.
 * @param {S[]} states - Array of states to validate.
 * @param {ValidatorFn<S>} validator - Function that receives all states and returns validation result.
 * @returns {UseMultiStateValidatorReturn<V>} The validation result.
 * @public
 * @see [Documentation](https://react-use.vercel.app/useMultiStateValidator)
 * @example
 * ```tsx
 * const isValid = useMultiStateValidator(
 *   [email, password, confirmPassword],
 *   (email, password, confirm) => email.includes('@') && password.length >= 8 && password === confirm
 * );
 * ```
 */
export function useMultiStateValidator<S, V>(
  states: S[],
  validator: ValidatorFn<S>
): UseMultiStateValidatorReturn<V> {
  const [result, setResult] = useState<V>(() =>
    validator(...states) as V
  )

  const validatorRef = useRef(validator)
  validatorRef.current = validator

  useEffect(() => {
    setResult(validatorRef.current(...states) as V)
  }, [states])

  return result
}
