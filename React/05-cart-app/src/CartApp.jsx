import { CatalogView } from "./components/CatalogView.jsx";
import { CartView } from "./components/CartView.jsx";
import { useState } from "react";

const initialCartItems = [
	/*{
        product: {
			id: 1,
			name: 'Teclado Mecánico RGB',
			description: 'Teclado Mecánico con luces RGB swtiches cherry red',
			price: 1000
		},
        quantity: 0,
        total: 0
    }*/
];

export const CartApp = () => {

	const [cartItems, setCartItems] = useState(initialCartItems);

	return (
		<>
			<div className="container">
				<h3>Cart App</h3>

				<CatalogView />

				<div className="my-4 w-75">
					<CartView items={ cartItems } />
				</div>
			</div>
		</>
	)
}