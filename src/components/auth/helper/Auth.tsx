import { useSelector } from "react-redux";
import {
  useLocation,
  useOutletContext,
  Navigate,
  Outlet,
} from "react-router-dom";
import { selectUserInfo } from "../../auth/store/userInfo";

interface AuthProps {
  allowedRoles: Array<string | number>;
}

const Auth = ({ allowedRoles }: AuthProps) => {
  const userInfo = useSelector(selectUserInfo);
  const location = useLocation();

  // 여기서 context 받기
  const context = useOutletContext();

  const hasAccess = userInfo?.roles?.some((role: { id: string | number }) =>
    allowedRoles.includes(role.id)
  );

  return hasAccess ? (
    <Outlet context={context} /> // context를 하위로 다시 넘김
  ) : (
    <Navigate to="/member/login" state={{ from: location }} replace />
  );
};

export default Auth;
