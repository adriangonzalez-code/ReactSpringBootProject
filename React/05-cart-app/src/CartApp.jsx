import { CatalogView } from "./components/CatalogView.jsx";
import { CartView } from "./components/CartView.jsx";
import { useItemsCart } from "./hooks/useItemsCart.js";
import { Navigate, Route, Routes } from "react-router-dom";
import {Navbar} from "./components/Navbar.jsx";

export const CartApp = () => {

	const { cartItems, handlerAddProductCart, handlerDeleteProductCart } = useItemsCart();

	return (
		<>
			<Navbar />
			<div className="container my-4">

				<h3>Cart App</h3>
				<Routes>
					<Route path="catalog" element={ <CatalogView handler = { (product) => handlerAddProductCart(product) } /> } />
					<Route path="cart" element={ (
						cartItems?.length <= 0 ?
							<div className="alert alert-warning">No hay productos en el carrito de compra</div>
							:
							(
								<div className="my-4">
									<CartView items={ cartItems } handlerDelete={ handlerDeleteProductCart } />
								</div>
							)
					) } />

					<Route path="/" element={<Navigate to={'/catalog'} />}/>
				</Routes>

			</div>
		</>
	)
}