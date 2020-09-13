import { useSelector } from "react-redux";

export function useAuth() {
  // validate is log in users
  const identity = useSelector((s) => s.user.identity);
  if (identity) {
    return true;
  }
  return false;
}
