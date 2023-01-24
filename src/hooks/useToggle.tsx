import { useState } from "react";

function useToggle(initialState: boolean = false): [boolean, any, any, any] {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = () => setState(!state);
  const setTrue = () => setState(true);
  const setFalse = () => setState(false);

  return [state, toggle, setTrue, setFalse];
}

export default useToggle;
