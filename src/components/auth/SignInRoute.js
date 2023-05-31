import Cookies from "js-cookie";

const SignInRoute = ({ path, element }) => {
    const rtk = Cookies.get("refreshToken");
    const authenticatedPath = ["/userSetting", "/userUpdate", "/postAddView", "/postUpdateView"];
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


    // const [ loginUser, setLoginUser ] = useRecoilState(loginUserState);

    // const authenticated = useMutation(async () => {
    //     const refreshInfo = {
    //         "username" : loginUser.username,
    //         "refreshToken" :  Cookies.get('refreshToken')
    //     }
        
    //     try {
    //         const response = await axios.post("http://192.168.2.18:8080/api/auth/refresh", refreshInfo);
    //         Cookies.set('accessToken', response.data.accessToken, { expires: 1 / 24 });
    //         setAuthState(true);
    //         return response;
    //     } catch(error) {
    //         setAuthState(false);
    //         return error;
    //     }
    // }, {
    //     enable: !Cookies.get("accessToken")
    // });
    // useEffect(() => {
    //     authenticated.mutate();
    // }, [])
    
    // if(authenticated.isLoading) {
    //     return <></>;
    // }

    
    // if (rtk === null){
    //     console.log("rtk null");
    //     console.log(authState);
    // }
