import react, { useState } from "react";
import Loader from "./Loader";

const useSpinner = () => {
  const [visible, setVisible] = useState(false);

  const showSpinner = () => setVisible(true);
  const hideSpinner = () => setVisible(false);
  const spinner = visible ? <Loader /> : null;
  return [spinner, showSpinner, hideSpinner];
};

export default useSpinner;
