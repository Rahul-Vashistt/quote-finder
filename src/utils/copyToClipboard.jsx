import { toast, Bounce } from "react-toastify";

export default async function copyToClipboard(value) {
  try {
    await navigator.clipboard.writeText(value);
    toast.success("Copied!",{
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
  } catch {
    toast.error("Failed to copy!");
  }
}