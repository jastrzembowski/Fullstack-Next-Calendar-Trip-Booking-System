import { toast, TypeOptions } from "react-toastify";

export const Toast = (message: string, type: TypeOptions) => {
  return toast(message, { type });
};
