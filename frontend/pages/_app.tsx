import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { UserProvider } from "../components/user";

export default function Application({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState(null);

    return (
        <UserProvider value={{ user, setUser }}>
            <Component {...pageProps} />
        </UserProvider>
    );
}
