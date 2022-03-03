export const auth = () => {
    const token = localStorage.getItem("auth_token");
    return token ? true : false;
};
