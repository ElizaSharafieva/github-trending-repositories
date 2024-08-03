import { useEffect } from 'react'

const useTimeoutEffect = (triggerTime, callback, timerRef) => {
  useEffect(() => {
    if (triggerTime) {
      const timeUntilTrigger = triggerTime - Date.now()

      if (timeUntilTrigger > 0) {
        timerRef.current = setTimeout(async () => {
          await callback()
        }, timeUntilTrigger)
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [triggerTime, callback, timerRef])
}

export default useTimeoutEffect