// utils/swalOverrides.ts
import Swal from "sweetalert2";
import customSwal from "../../style/customSwal.styles";
import { apiSendWalletAuthCode, apiVerifyAuthCode } from "../api/backApi";
import { selectUserInfo } from "../../components/auth/store/userInfo";

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
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "등록",
      cancelButtonText: "취소",
      preConfirm: () => {
        const discount = parseFloat(
          (document.getElementById("discount") as HTMLInputElement).value
        );

        if (isNaN(discount) || discount < 0 || discount > 100) {
          return customSwal.showValidationMessage(
            "할인율은 0~100 사이 숫자여야 합니다."
          );
        }

        return { discount };
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

  (window as any).promptCode = async (
    userId: number
  ): Promise<string | null> => {
    const { value: code } = await customSwal.fire({
      title: "인증 코드 입력",
      input: "text",
      inputLabel: "인증 코드를 입력하세요.",
      inputPlaceholder: "인증 코드",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      showLoaderOnConfirm: true, // 로딩 애니메이션
      preConfirm: async (value) => {
        if (!value) {
          customSwal.showValidationMessage("인증 코드를 입력해주세요.");
          return false;
        }
        const isVerified = await apiVerifyAuthCode(userId, value);

        if (!isVerified) {
          customSwal.showValidationMessage("인증 코드가 올바르지 않습니다.");
          return false;
        }

        return value; // 인증 성공 시 코드 반환
      },
      allowOutsideClick: () => !customSwal.isLoading(), // 로딩 중 외부 클릭 차단
    });

    return code || null;
  };

  (window as any).promptSendAuthCode = async (
    userId: number
  ): Promise<boolean> => {
    try {
      await apiSendWalletAuthCode(userId);

      await customSwal.fire({
        icon: "success",
        text: "이메일로 인증코드가 전송되었습니다.",
        confirmButtonText: "확인",
      });

      const code = await (window as any).promptCode(userId);
      if (code === null) return false;

      return true;
    } catch (error) {
      console.error("인증실패", error);
      await customSwal.fire({
        icon: "error",
        text: "인증 중 오류가 발생했습니다.",
        confirmButtonText: "확인",
      });
      return false;
    }
  };
}
