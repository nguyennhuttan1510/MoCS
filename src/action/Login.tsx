import HttpClient from "service/https";

export interface Iaccount {
    username: string,
    password: string,
}

const signin = async (account: Iaccount) => {
    if (!account) return;
    const acc = {
        username: account.username,
        password: account.password,
    }
    let result;
    try {
        const httpClient = HttpClient();
        const handleResponse = await httpClient.post('login/', acc)         //NOTE REMENBER ADD "/" SUCH AS SERVER
        result = await handleResponse.data;
    } catch (error) {
        console.log(error)
    }
    return result;
}

const getStaff = async (id: number) => {
    let result;
    try {
        const httpClient = HttpClient();
        const handleResponse = await httpClient.get(`staff/${id}`)
        result = await handleResponse.data;
        console.log(result);
    } catch (error) {
        console.log(error)
    }
    return result;
}

const Authenticator = {
    signin,
    getStaff,
};

export default Authenticator;