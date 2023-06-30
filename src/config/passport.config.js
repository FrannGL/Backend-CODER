import fetch from "node-fetch";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import { UserModel } from "../DAO/models/users.model.js";
import { GITHUB_SECRET } from "./env.js";
const LocalStrategy = local.Strategy;

export function iniPassport() {
	passport.use(
		"github",
		new GitHubStrategy(
			{
				clientID: "Iv1.96c1b2f8b8c46bf1",
				clientSecret: GITHUB_SECRET,
				callbackURL: "http://localhost:8080/api/sessions/githubcallback",
			},
			async (accesToken, _, profile, done) => {
				console.log(profile);
				try {
					const res = await fetch("https://api.github.com/user/emails", {
						headers: {
							Accept: "application/vnd.github+json",
							Authorization: "Bearer " + accesToken,
							"X-Github-Api-Version": "2022-11-28",
						},
					});
					const emails = await res.json();
					const emailDetail = emails.find((email) => email.verified == true);

					if (!emailDetail) {
						return done(new Error("cannot get a valid email for this user"));
					}
					profile.email = emailDetail.email;

					let user = await UserModel.findOne({ email: profile.email });
					if (!user) {
						const newUser = {
							email: profile.email,
							username: profile._json.name || profile._json.login || "noname",
							rol: "user",
							password: "nopass",
						};
						let userCreated = await UserModel.create(newUser);
						console.log("User Registration succesful");
						return done(null, userCreated);
					} else {
						console.log("User already exists");
						return done(null, user);
					}
				} catch (e) {
					console.log("Error en auth github");
					console.log(e);
					return done(e);
				}
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser(async (id, done) => {
		let user = await UserModel.findById(id);
		done(null, user);
	});
}
