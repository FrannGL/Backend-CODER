export default class UsersDTO {
	constructor(users) {
		this.firstName = users.firstName;
		this.lastName = users.lastName;
		this.age = users.age;
		this.email = users.email;
		this.password = users.password;
		this.role = "user";
		this.cartID = users.cartID;
	}
}
