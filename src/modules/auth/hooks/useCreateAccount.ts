import {useState} from "react";
export function useCreateAccount(){
    const [accountType, setAccountType] = useState("");
    const [createAccount, setCreateAccount] = useState(false);
    return {
        accountType,
        setAccountType,
        createAccount,
        setCreateAccount
    };
}