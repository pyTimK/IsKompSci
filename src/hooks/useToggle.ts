import { useCallback, useState } from "react";

const useToggle = (initialState = false): [boolean, () => void] => {
  const [state, setState] = useState(initialState);
  const toggleState = useCallback(() => setState((state) => !state), []);
  return [state, toggleState];
};

export default useToggle;
