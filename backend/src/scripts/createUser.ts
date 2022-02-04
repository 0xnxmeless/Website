import prisma from "../db";
import prompts from "prompts";
import argon2, { argon2id } from "argon2";

(async () => {
    const response = await prompts([
        {
            type: "text",
            name: "username",
            message: "Enter a username for the account.",
            validate: async (value) => {
                if (value.length < 3)
                    return "Username must be at least 3 characters long.";

                if (value.length > 20)
                    return "Username must not be longer than 20 characters.";

                const user = await prisma.user.findUnique({
                    where: {
                        username: value,
                    },
                });

                if (user) return "Username is already taken.";
                return true;
            },
        },
        {
            type: "password",
            name: "password",
            message: "Enter a password for the account.",
            validate: (value) => {
                if (value.length < 8)
                    return "For the security of this account, the password must be at least 8 characters long.";

                return true;
            },
        },
    ]);

    const hashedPassword = await argon2.hash(response.password, {
        type: argon2id,
    });

    const user = await prisma.user.create({
        data: {
            username: response.username,
            password: hashedPassword,
        },
    });

    console.log(
        `Successfully created user ${user.username} with UUID ${user.uuid}`
    );
})();
