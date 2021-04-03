import { useEffect, useState } from "react"

export const useAlert = () => {
  const [message, setMessage] = useState('')
  const [type, setType] = useState('info')
  const [open, setOpen] = useState(false)
  const [duration, setDuration] = useState(5000)
  const [callBack, setCallBack] = useState(() => {})

  useEffect(() => {
    if (open && callBack) {
      setTimeout(callBack, 3000);
    }
  }, [callBack, open])

  const showAlert = (msg, alertType: 'success' | 'info' | 'error' | 'warning', dur, callbackFn) => {
    setOpen(true);
    setMessage(msg)
    setType(alertType);
    setDuration(dur)
    setCallBack(callbackFn)
  }

  const closeAlert = () => setOpen(false)

  return {open, message, type, duration, closeAlert, showAlert}
}