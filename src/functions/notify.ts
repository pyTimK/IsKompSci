import { toast, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  duration?: number;
  type?: TypeOptions;
}

const notify = (text: string, props: Props = { duration: 2000, type: "error" }) => {
  toast(text, {
    position: "top-center",
    autoClose: props.duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: props.type,
  });
};

export default notify;
