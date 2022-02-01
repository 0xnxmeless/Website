export {};
declare global {
    const enum ResponseMessage {
        RouteNotFound = "RouteNotFound",
        WelcomeMessage = "WelcomeMessage",
        InvalidSession = "InvalidSession",
        ExpiredSession = "ExpiredSession",
        SessionUserNotFound = "SessionUserNotFound",
        InvalidRequestBody = "InvalidRequestBody",
        MissingRequiredFields = "MissingRequiredFields",
        InvalidCredentials = "InvalidCredentials",
        LoginSuccess = "LoginSuccess",
        LogoutSuccess = "LogoutSuccess",
    }
}
