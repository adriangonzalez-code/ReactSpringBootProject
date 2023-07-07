import { useEffect, useState } from "react";

export const FormItemView = ({ handler }) => {

	const [formItemsState, setFormItemsState] = useState({
		product: '',
		price: '',
		quantity: ''
	});

	const { product, price, quantity } = formItemsState;

	useEffect(() => {
	}, [price]);

	useEffect(() => {
	}, [formItemsState]);

	const onInputChange = ({target: {name, value}}) => {
		setFormItemsState({
			...formItemsState,
			[ name ]: value
		});
	}

	const onInvoiceItemSubmit = (event) => {
		event.preventDefault();
		if (product.trim().length <= 1) {
			alert("Debe ingresar un producto");
			return;
		}
		if (price.trim().length <= 1) {
			alert("Debe ingresar un precio");
			return;
		}
		if (quantity.trim().length < 1) {
			alert("Debe ingresar una cantidad");
			return;
		}

		if (isNaN(price.trim())) {
			alert("El precio no es un número");
			return;
		}
		if (isNaN(quantity.trim())) {
			alert("La cantidad no es un número");
			return;
		}

		handler(formItemsState);

		setFormItemsState({
				product: '',
				price: '',
				quantity: ''
			}
		);
	}

	return (
		<>
			<form className="w-50" onSubmit={event => onInvoiceItemSubmit(event)}>
				<input value={ product } type="text" className="form-control m-3" onChange={ onInputChange } name="product" placeholder="Producto"/>
				<input value={ price } type="text" className="form-control m-3" onChange={ event => onInputChange(event) } name="price" placeholder="Precio"/>
				<input value={ quantity } type="text" className="form-control m-3" onChange={ onInputChange } name="quantity" placeholder="Cantidad"/>

				<button className="btn btn-primary m-3" type="submit">Nuevo Item</button>
			</form>
		</>
	)
}