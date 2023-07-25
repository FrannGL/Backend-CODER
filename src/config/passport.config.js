import fetch from "node-fetch";
import passport from "passport";
import GitHubStrategy from "passport-github2";
import local from "passport-local";
import { UsersMongoose } from "../DAO/models/mongoose/users.mongoose.js";
import { cartService } from "../services/carts.service.js";
import { createHash, isValidPassword } from "../utils/main.js";
const LocalStrategy = local.Strategy;

export function iniPassport() {
	passport.use(
		"login",
		new LocalStrategy({ usernameField: "email", passReqToCallback: true }, async (req, username, password, done) => {
			try {
				const user = await UsersMongoose.findOne({ email: username }).exec();
				if (!user) {
					console.log("User Not Found with email " + username);
					req.session.errorMsg = "Usuario inexistente con el email proporcionado";
					return done(null, false);
				}
				if (!isValidPassword(password, user.password)) {
					req.session.errorMsg = "Contraseña incorrecta";
					console.log("Invalid Password");
					return done(null, false);
				}

				return done(null, user);
			} catch (err) {
				return done(err);
			}
		})
	);

	passport.use(
		"register",
		new LocalStrategy(
			{
				passReqToCallback: true,
				usernameField: "email",
			},
			async (req, username, password, done) => {
				try {
					const { email, firstName, lastName, age, admin } = req.body;
					const user = await UsersMongoose.findOne({ email: username }).exec();
					if (user) {
						console.log("User already exists");
						return done(null, false);
					}

					if (!password) {
						throw new Error("No password provided");
					}

					const newUser = {
						age,
						email,
						firstName,
						lastName,
						admin,
						password: createHash(password),
					};
					const userCreated = await UsersMongoose.create(newUser);

					const cartId = userCreated.cartID;

					await cartService.createCart(cartId);

					console.log("User Registration successful");
					return done(null, userCreated);
				} catch (e) {
					console.log("Error in register");
					return done(e);
				}
			}
		)
	);

	passport.use(
		"github",
		new GitHubStrategy(
			{
				clientID: "Iv1.96c1b2f8b8c46bf1",
				clientSecret: process.env.GITHUB_CLIENT_SECRET,
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
					const emailDetail = emails.find(email => email.verified == true);

					if (!emailDetail) {
						return done(new Error("cannot get a valid email for this user"));
					}
					profile.email = emailDetail.email;

					let user = await UsersMongoose.findOne({ email: profile.email });
					if (!user) {
						const newUser = {
							email: profile.email,
							firstName: profile._json.name || profile._json.login || "noname",
							role: "user",
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
		let user = await UsersMongoose.findById(id);
		done(null, user);
	});
}
