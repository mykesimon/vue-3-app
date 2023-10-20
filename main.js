const app = Vue.createApp({
	data() {
		return {
			cart: [],
			premium: true,
		};
	},
	methods: {
		updateCartAdd(id) {
			this.cart.push(id);
		},
		updateCartRemove(id) {
			const indexToRemove = this.cart.indexOf(id);
			if (indexToRemove !== -1) {
				this.cart.splice(indexToRemove, 1);
			}
		},
	},
});
