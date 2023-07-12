import { useEffect, useState } from "react";
import { getProducts } from "../services/productsService.js";
import { ProductCardView } from "./ProductCardView.jsx";

export const CatalogView = ({ handler }) => {

	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(getProducts);
	}, []);

	return (
		<>
			<div className="row">
				{ products.map(prod => (
					<div className="col-4 my-2" key={ prod.id }>
						<ProductCardView id={prod.id} name={prod.name} price={prod.price} description={prod.description} handler={ handler }/>
					</div>
				)) }
			</div>
		</>
	)
}