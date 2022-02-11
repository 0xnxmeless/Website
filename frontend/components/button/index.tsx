import { Component, ReactNode } from "react"

export type WithChildren<T = Record<string, unknown>> = T & Record<"children", ReactNode>;

type ButtonProps = {
    icon?: string;
}

export default function Button({ children, icon }: WithChildren<ButtonProps>) {
    return (
        <h1>
            {/* TODO: Finish */}
        </h1>
    )
}