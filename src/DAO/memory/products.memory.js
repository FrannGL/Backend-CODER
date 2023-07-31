class ProductsMemory {
	constructor() {
		this.data = [];
	}

	async read() {
		return this.data;
	}
	async readWithPagination() {
		try {
			const queryResult = await this.data.find(query, {
				page: pagina || 1,
				limit: limit || 5,
				sort: sortOptions,
			});
			return queryResult;
		} catch (e) {
			console.log(e);
		}
	}
	async readById(_id) {
		try {
			const productById = await this.data.find({ _id });
			return productById;
		} catch (e) {
			console.log(e);
		}
	}
	async create({ title, description, price, thumbnail, code, stock }) {
		try {
			const ProductCreated = await this.data.find({
				title,
				description,
				price,
				thumbnail,
				code,
				stock,
			});
			return ProductCreated;
		} catch (e) {
			console.log(e);
		}
	}
	async update({ _id, title, description, price, thumbnail, code, stock }) {
		try {
			const productUpdated = await this.data.find({ _id: _id }, { title, description, price, thumbnail, code, stock });
			return productUpdated;
		} catch (e) {
			console.log(e);
		}
	}
	async delete(id) {
		try {
			const result = await this.data.find({ _id: id });
			return result;
		} catch (e) {
			console.log(e);
		}
	}
}

export const productsMemory = new ProductsMemory();
