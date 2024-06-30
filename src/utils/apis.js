import { baseUrl } from "./BaseUrl";

export const authUrls = {
    login : baseUrl + "/auth/login",
    register : baseUrl + "/auth/register",
    rolesChange : baseUrl + "/auth/change-role",
    changePassword : baseUrl + "/auth/change-password",
}

export const usersInfo = { 
    allUsers : baseUrl + "/auth/user-information",
    userInfo: baseUrl + "/auth/current_loogged_user",
    userNotification: baseUrl + "/api/notifications",
    usersInfo: baseUrl + "/auth/user-information"
}

export const announcements = {
    announcementss : baseUrl + "/api/announcement",
}
export const AddressesUrls = {
    addrss : baseUrl + "/api/address",
    addressUser: baseUrl + "/api/address_user"
}
export const forumsUrls = {
    forums : baseUrl + "/api/forum",
    comment : baseUrl + "/api/comment",
    lostFound: baseUrl + "/api/lost_found"
}

