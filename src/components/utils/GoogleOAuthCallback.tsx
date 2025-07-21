// 📁 src/pages/auth/GoogleOAuthCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiGoogleOAuthLogin } from "../../components/api/backApi";
import { setCurrentUser } from "../../components/auth/helper/storage";
import { setUserInfo } from "../../components/auth/store/userInfo";
import { useDispatch } from "react-redux";

export default function GoogleOAuthCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (!code) {
      alert("구글 인증 코드가 없습니다.");
      navigate("/login");
      return;
    }

    apiGoogleOAuthLogin(code)
      .then((res) => {
        if (res.needRegister) {
          // ❌ 회원 정보가 DB에 없음 → 회원가입 유도
          navigate("/register/google", {
            state: res.googleUser, // ex: { email, name }
          });
        } else {
          // ✅ 기존 회원 → 로그인 처리
          setCurrentUser(res); // localStorage 저장
          dispatch(setUserInfo(res.user)); // redux 저장
          navigate("/"); // 홈으로 이동
        }
      })
      .catch((err) => {
        console.error("구글 로그인 처리 실패", err);
        alert("구글 로그인 처리 중 오류가 발생했습니다.");
        navigate("/login");
      });
  }, []);

  return <div>로그인 처리 중입니다...</div>;
}
