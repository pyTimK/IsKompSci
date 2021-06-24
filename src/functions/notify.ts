import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (text, duration = 2000) =>
  toast.error(text, {
    position: "top-center",
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export default notify;
