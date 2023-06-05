import Cookies from "js-cookie";

const SignInRoute = ({ path, element }) => {
    const rtk = Cookies.get("refreshToken");
    const authenticatedPath = ["/userSetting", "/userUpdate", "/postAddView", "/postUpdateView", "/change/password"];
    const authPath = "/auth";

    console.log(rtk === undefined)
    console.log(authenticatedPath.some(authPath => path.startsWith(authPath)))
    if (rtk === undefined && authenticatedPath.some(authPath => path.startsWith(authPath))) {
        window.location.replace("/auth/login")
        return;
    }

    if (rtk !== undefined && path.startsWith(authPath)) {
        window.location.replace("/")
        return;
    }

    return element;
}

export default SignInRoute;
