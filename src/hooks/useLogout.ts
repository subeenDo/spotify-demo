import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router";


const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  return () => {
    localStorage.removeItem("access_token");
    queryClient.removeQueries({ queryKey: ["current-user-profile"] });
    queryClient.removeQueries({ queryKey: ["current-user-playlist"] });
    navigate(location.pathname + location.search, { replace: true });
  };
};

export default useLogout;