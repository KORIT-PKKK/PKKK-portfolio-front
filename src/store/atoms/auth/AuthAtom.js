import { atom } from "recoil";

export const authenticationState = atom({
    key: "authenticated",
    default: false
});