// utils/swalOverrides.ts
import customSwal from "../../style/customSwal.styles";

export function overrideAlertConfirmPrompt() {
  window.alert = (message) => {
    customSwal.fire({
      text: String(message),
      icon: undefined,
      confirmButtonText: "확인",
    });
  };

  (window as any).confirm = (message: string) => {
    return customSwal
      .fire({
        text: String(message),
        icon: undefined,
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        reverseButtons: true,
      })
      .then((result: { isConfirmed: any }) => result.isConfirmed);
  };

  (window as any).promptDiscount = async () => {
    const { value: percent } = await customSwal.fire({
      title: "할인율 입력",
      input: "text",
      inputLabel: "0부터 100 사이의 숫자를 입력해주세요",
      inputPlaceholder: "예: 10",
      showCancelButton: true,
      confirmButtonText: "적용",
      cancelButtonText: "취소",
      inputValidator: (value) => {
        const num = parseFloat(value);
        if (!value || isNaN(num) || num < 0 || num > 100) {
          return "0부터 100 사이 숫자를 입력해주세요.";
        }
      },
    });

    return percent !== undefined ? parseFloat(percent) : null;
  };
}
