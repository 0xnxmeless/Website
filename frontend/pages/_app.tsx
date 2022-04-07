import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { UserProvider } from "../components/user";
import * as api from "../api";

export default function Application({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let fetchData = async () => {
            const data = await api.getUser().catch(() => {});

            if (data && data.code && data.code == "UserRetrieveSuccess")
                setUser(data.data);
        };

        fetchData();
    });

    return (
        <UserProvider value={{ user, setUser }}>
            <Component {...pageProps} />
        </UserProvider>
    );
}
