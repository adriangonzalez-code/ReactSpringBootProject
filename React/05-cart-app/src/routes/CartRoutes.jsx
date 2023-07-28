import { Navigate, Route, Routes } from "react-router-dom";
import { CatalogView } from "../components/CatalogView.jsx";
import { CartView } from "../components/CartView.jsx";

export const CartRoutes = ({ handlerAddProductCart, cartItems, handlerDeleteProductCart }) => {
	return (
		<>
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
		</>
	)
}