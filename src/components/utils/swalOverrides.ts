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

  (window as any).promptGroupDiscount = async () => {
    const { value: values } = await customSwal.fire({
      title: "할인 정보 입력",
      html: `
      <label for="discount">할인율 (0~100%)</label>
      <input id="discount" type="number" min="0" max="100" class="swal2-input" placeholder="예: 20">
      
      <label for="groupCount"><br>구매인원 (5~10명)</label>
      <input id="groupCount" type="number" min="5" max="10" class="swal2-input" placeholder="예: 6">
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "등록",
      cancelButtonText: "취소",
      preConfirm: () => {
        const discount = parseFloat(
          (document.getElementById("discount") as HTMLInputElement).value
        );
        const groupCount = parseInt(
          (document.getElementById("groupCount") as HTMLInputElement).value,
          10
        );

        if (isNaN(discount) || discount < 0 || discount > 100) {
          return customSwal.showValidationMessage(
            "할인율은 0~100 사이 숫자여야 합니다."
          );
        }

        if (isNaN(groupCount) || groupCount < 5 || groupCount > 10) {
          return customSwal.showValidationMessage(
            "인원수는 5~10 사이의 정수여야 합니다."
          );
        }

        return { discount, groupCount };
      },
    });

    return values ?? null;
  };

  (window as any).validateForm = async (
    fields: { name: string; value: string }[]
  ) => {
    for (const field of fields) {
      if (!field.value.trim()) {
        await customSwal.fire({
          text: `"${field.name}" 입력란을 작성해주세요.`,
          icon: "warning",
          confirmButtonText: "확인",
        });
        return false;
      }
    }
    return true;
  };
}
