app.component('product-display', {
	props: {
		premium: {
			type: Boolean,
			required: true,
		},
		cart: {
			type: Array,
			required: true,
		},
	},
	template:
		/*html*/
		`<div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img :class="{'out-of-stock-img': !inStock}" :src="image" :alt="description">
        </div>
        <div class="product-info">
          <h1>{{title}} <small v-if="inSale">is on sale</small></h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>

          <p>Shipping: {{shipping}}</p>
          
          <product-details :details="details"></product-details>
          <div class="color-circle" :style="{backgroundColor: variant.color}" v-for="(variant, index) in variants"
            :key="variant.id" @mouseover="updateVariant(index)">
          </div>
          <div className="actions">
            <button class="button" :class="{disabledButton: !inStock}" @:click="addToCart" :disabled="!inStock">Add to
            cart</button>
            <button class="button" :class="{disabledButton: cart.length === 0 || !inStock}" @:click="removeFromCart" :disabled="cart.length === 0 || !inStock">Remove from cart</button>
          </div>
        </div>
      </div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
    </div>`,

	data() {
		return {
			product: 'Socks',
			brand: 'Vue Mastery',
			selectedVariant: 0,
			details: ['50% cotton', '30% wool', '20% polyester'],
			variants: [
				{ id: 2234, color: 'green', image: './assets/images/socks_green.jpg', description: 'this is a green sock', quantity: 50, onSale: true },
				{ id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', description: 'this is a blue sock', quantity: 0, onSale: false },
			],
			reviews: [],
		};
	},
	methods: {
		addToCart() {
			if (this.variants[this.selectedVariant].quantity > 0) {
				this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
				this.variants[this.selectedVariant].quantity--;
			}
		},
		removeFromCart() {
			if (this.variants[this.selectedVariant].quantity > 0) {
				this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
				this.variants[this.selectedVariant].quantity++;
			}
		},
		updateVariant(index) {
			this.selectedVariant = index;
		},
		addReview(review) {
			this.reviews.push(review);
			console.log(this.reviews);
		},
	},
	computed: {
		title() {
			return `${this.brand} ${this.product} `;
		},
		image() {
			return this.variants[this.selectedVariant].image;
		},
		description() {
			return this.variants[this.selectedVariant].description;
		},
		inStock() {
			return this.variants[this.selectedVariant].quantity > 0;
		},
		inSale() {
			return this.variants[this.selectedVariant].onSale;
		},
		shipping() {
			if (this.premium) {
				return 'Free';
			}

			return '£2.99';
		},
	},
});
