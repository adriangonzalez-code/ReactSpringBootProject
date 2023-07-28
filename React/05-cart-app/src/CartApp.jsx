import { CatalogView } from "./components/CatalogView.jsx";
import { CartView } from "./components/CartView.jsx";
import { useItemsCart } from "./hooks/useItemsCart.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import { CartRoutes } from "./routes/CartRoutes.jsx";

export const CartApp = () => {

	const { cartItems, handlerAddProductCart, handlerDeleteProductCart } = useItemsCart();

	return (
		<>
			<Navbar />
			<div className="container my-4">

				<h3>Cart App</h3>
				<CartRoutes cartItems={ cartItems }
							handlerAddProductCart={ handlerAddProductCart }
							handlerDeleteProductCart={ handlerDeleteProductCart } />
			</div>
		</>
	)
}