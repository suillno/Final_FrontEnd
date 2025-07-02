import Swal, { SweetAlertOptions } from "sweetalert2";

const customSwal = Swal.mixin({
  customClass: {
    popup: "swal-popup",
    confirmButton: "swal-confirm",
    cancelButton: "swal-cancel",
  },
  background: "#1e1e1e",
  color: "#ffffff",
  confirmButtonColor: "#4CAF50",
  cancelButtonColor: "#f44336",
} as SweetAlertOptions);

export default customSwal;
