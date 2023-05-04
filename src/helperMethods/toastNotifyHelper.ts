import { toast, TypeOptions } from "react-toastify";


const toastNotifyHelper = (toastNotificationMessage: string, toastNotificationType: TypeOptions='success') => { // TypeOptions it's alredy defied inside the react notify
  toast(toastNotificationMessage, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    type: toastNotificationType // to modify the notification type if the user wants
  });
}


export default toastNotifyHelper;