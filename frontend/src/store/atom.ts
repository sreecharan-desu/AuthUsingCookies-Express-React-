import { atom } from "recoil";


export const userAtom = atom({
    key : "userAtom",
    default : {
        id : "",
        username : "",
        email : ""
    }
})

export const isAuth = atom({
    key : "isAuth",
    default : true
})