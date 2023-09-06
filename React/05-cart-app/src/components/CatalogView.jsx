import { useEffect, useState } from "react";
import { getProducts } from "../services/productsService.js";
import { ProductCardView } from "./ProductCardView.jsx";

export const CatalogView = ({ handler }) => {

	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const findAll = async () => {
		const prods = await getProducts();
		setProducts(prods);
		setIsLoading(false);
	}

	useEffect(() => {
		findAll()
	}, []);

	return (
		<>
			{ isLoading && <div className="alert alert-info">Cargando...</div>}
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