"use client";

import Cookies from "js-cookie";
interface IUseCookie {
    key: "token_zenmi_baby" | string;
    initialValue?: string;
}

const useCookie = (key: IUseCookie["key"] = "token_zenmi_baby", initialValue?: IUseCookie["initialValue"]) => {
    const setCookie = (value: string, options?: Cookies.CookieAttributes) => {
        Cookies.set(key, value, options);
    };

    const removeCookie = (options?: Cookies.CookieAttributes) => {
        Cookies.remove(key, options);
    };

    return { setCookie, removeCookie };
};

export default useCookie;
