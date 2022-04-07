# Website

My new portfolio/personal website. This is heavily overengineered, and pretty much everything on this website is dynamic.

I would not recommend using this code for your own personal website, some of this code isn't great and probably won't perform well under particular circumstances, but for the sake of my personal website, it's more than adequate.

I don't consider myself a "professional" programmer, so if you do have any suggestions on how I can improve my code, feel free to contact me through any of the contact links, listed [here](https://domhoe.dev/contacts).

# Technologies Used

This website uses the following technologies:
- [Next.js](https://nextjs.org)
- [Express](http://expressjs.com)
- [TypeScript](https://typescriptlang.org)
- [Prisma](https://prisma.io)

I have gathered a considerable amount of knowledge in building this project, including certain features of Prisma that I wasn't aware of prior to building some of the features into this website.

# Setup

## Backend

To begin with, you will want to have a remote Linux server running. It doesn't matter where, but it should have the following packages/tools installed to it:
- [Docker](https://docker.com/)
- [Node.js](https://nodejs.org/) (including [npm](https://www.npmjs.com/))
- Some type of web server (e.g. [Apache](https://httpd.apache.org/), [Nginx](https://nginx.com/), [Caddy](https://caddyserver.com) etc.)
- [PostgreSQL](https://postgresql.org/) database server

After you've ensured that you have the tools listed above, and have configured them, follow these steps:
- Clone the repository (`git clone https://github.com/Dominic-Hoe/Website.git`)
- Navigate to the folder you just cloned to (`cd Website`)
- Navigate to the `backend` folder (`cd backend`)
- Fill in the fields in the `.env.example` folder with the port that the server will run on, and the connection string for the database
- Rename `.env.example` to `.env`
- Run `npm install`
- Run `npx prisma db push` to push the database schema on the database
- Run `docker build . -t backend`
- Run `docker run -d -p 3000:3000 --name backend backend`
- Ensure that there are no errors when running by executing `docker logs backend`
- If it says `Backend website is up, running at http://localhost:3000`, then you're finished.

## Additional Instructions

If you wish to actually manage the site, add content, et cetera, you will need a user account.

To create a user account, firstly follow the steps mentioned previously, then run `npm run createUserAccount`. This will take you through a prompt to set your username and password. **Ensure you do not use a weak password. At current, there is no way to change passwords.**

### Troubleshooting

If you encounter any issues when trying to run the server, please ensure that you have **configured PostgreSQL correctly.** Misconfigurations of PostgreSQL can cause Prisma to fail to connect to the database.

## Frontend

In reality, the idea for this project was to host the frontend on [Vercel](https://vercel.com/), so therefore no Dockerfiles or other types of hosting files are included for the frontend project.

However, for whatever reason, if you wish to host this on your own web server, feel free to look at how to [deploy a Next.js project here](https://nextjs.org/docs/deployment).

Everything else is included.

# Licensing

This entire project is licensed under the MIT license - feel free to fork this project, poke and prod at it, use the code for anything you wish. I would appreciate it if you were to give me credit if you were to use this code, though.