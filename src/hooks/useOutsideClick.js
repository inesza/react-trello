// import { useRef, useEffect } from "react"

const handleClickOutside = (targetRef, action, event) => {
  if (
    targetRef &&
    targetRef.current
    && event.target !== targetRef.current
    && !targetRef.current.contains(event.target)) {
    action();
  }
};

export default handleClickOutside