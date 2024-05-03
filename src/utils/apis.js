import { baseUrl } from "./BaseUrl";

export const authUrls = {
    login : baseUrl + "/auth/login",
    register : baseUrl + "/auth/register",
    rolesChange : baseUrl + "/auth/change-role",
    changePassword : baseUrl + "/auth/change-password",
}

export const usersInfo = { 
    allUsers : baseUrl + "/api/auth/user-information",
    userInfo: baseUrl + "/api/auth/current_loogged_user",
    userNotification: baseUrl + "/api/notifications"
}
