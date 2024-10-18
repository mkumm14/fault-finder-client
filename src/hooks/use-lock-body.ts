/**
 * A custom hook that locks the body scroll when the component is mounted
 * and restores the original scroll behavior when the component is unmounted.
 *
 * This hook uses `useLayoutEffect` to ensure that the side effect runs
 * synchronously after all DOM mutations.
 *
 * @see https://usehooks.com/useLockBodyScroll
 *
 * @example
 * ```typescript
 * import { useLockBody } from './use-lock-body';
 *
 * function App() {
 *   useLockBody();
 *   return <div>Your content here</div>;
 * }
 * ```
 */
import * as React from "react"

// @see https://usehooks.com/useLockBodyScroll.
export function useLockBody() {
    React.useLayoutEffect((): (() => void) => {
        const originalStyle: string = window.getComputedStyle(
            document.body
        ).overflow
        document.body.style.overflow = "hidden"
        return () => (document.body.style.overflow = originalStyle)
    }, [])
}

