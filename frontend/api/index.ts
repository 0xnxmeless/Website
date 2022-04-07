import Axios, { Method } from "axios";

export type CredentialProps = {
    username?: string;
    password?: string;
    email?: string;
};

type RequestProps = {
    endpoint: string;
    method: Method;
    body?: any;
};

const request = ({ endpoint, method, body }: RequestProps) =>
    new Promise<any>(async (resolve, reject) => {
        try {
            const baseURL = `https://3001-dominichoe-website-rc4scw4sigk.ws-eu38.gitpod.io`;

            const { data } = await Axios({
                url: `${baseURL}${endpoint}`,
                method,
                data: body ? body : null,
                withCredentials: true,
            });
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });

const login = async ({ username, password }: CredentialProps) => {
    const data = await request({
        endpoint: "/auth/login",
        method: "POST",
        body: { username, password },
    });

    return data;
};

const logout = async () => {
    const data = await request({
        endpoint: "/auth/logout",
        method: "GET",
    });

    return data;
};

const getUser = async () => {
    const data = await request({
        endpoint: "/auth/me",
        method: "GET",
    });

    return data;
};

const getSkills = async () => {
    const data = await request({
        endpoint: "/skills",
        method: "GET",
    });

    return data;
};

const createSkill = async (
    name: string,
    type: string,
    link: string,
    imageUrl: string,
    badgeColor: string
) => {
    const data = await request({
        endpoint: "/skills",
        method: "POST",
        body: { name, type, link, imageUrl, badgeColor },
    });

    return data;
};

const deleteSkill = async (uuid: string) => {
    const data = await request({
        endpoint: `/skills/${uuid}`,
        method: "DELETE",
    });

    return data;
};



export { login, logout, getUser, getSkills, createSkill, deleteSkill };
