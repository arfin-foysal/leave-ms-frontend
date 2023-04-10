import Cookies from "js-cookie";
export const headers = {
  Authorization: `Bearer ${Cookies.get("leave_user_token")}`,
  "Access-Control-Allow-Origin": "*",
};
