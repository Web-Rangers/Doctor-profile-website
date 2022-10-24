import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
	providers: [
		CredentialProvider({
			credentials: {
				email: { label: "Email", type: "text", placeholder: "E-mail" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				if (credentials?.email === "forzaitalia@gmail.com" && credentials.password === "qwerty") {
					// handle user auth here
					const user = { id: "859", name: "Bernardo", email: credentials?.email};
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	callbacks: {
		session({session,token,user}){
			session.user.id = token.sub;
			return session
		}
	},
	secret: "test",
	pages: {
		signIn: "auth/sigin",
	},
	session:{
		strategy:'jwt',
		maxAge: 2592000
	}
});