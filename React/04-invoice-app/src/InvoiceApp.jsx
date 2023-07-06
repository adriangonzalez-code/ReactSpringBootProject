import { useState, useEffect } from "react";
import { getInvoice } from "./services/getInvoice";
import { InvoiceView } from "./components/InvoiceView";
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";

const invoiceInitial = {
	id: 0,
	name: '',
	client: {
		name: '',
		lastName: '',
		address: {
			country: '',
			city: '',
			street: '',
			number: 0
		}
	},
	company: {
		name: '',
		fiscalNumber: 0
	},
	items: []
}

export const InvoiceApp = () => {

	const [invoice, setInvoice] = useState(invoiceInitial);

	const [items, setItems] = useState([]);

	useEffect(() => {
		const data = getInvoice();
		console.log(data);
		setInvoice(data);
		setItems(data.items);
	}, []);


	// const invoice = getInvoice();
    const { total, id, name, client, company, items: itemsInitial } = invoice;

	const [formItemsState, setFormItemsState] = useState({
		product: '',
		price: '',
		quantity: ''
	});

	const { product, price, quantity } = formItemsState;

	const [counter, setCounter] = useState(4);

	const onInputChange = ({target: {name, value}}) => {
		/*console.log(name);
		console.log(value);*/

		setFormItemsState({
			...formItemsState,
            [ name ]: value
		});
	}

	const onInvoiceItemSubmit = () => {
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

		setItems([...items, {
			id: counter,
			product: product.trim(),
			price: +price.trim(),
			quantity: parseInt(quantity.trim(), 10)
		}]);

		setFormItemsState(
			{
				product: '',
				price: '',
				quantity: ''
			}
		)
		setCounter(counter + 1);
	}

    return (
        <>
            <div className="container">
				<div className="card my-3">
					<div className="card-header">
						<h5 className="card-title">Ejemplo Factura</h5>
					</div>
					<div className="card-body">
						<InvoiceView id = { id } name={ name }/>

						<div className="row my-3">
							<div className="col">
								<ClientView title="Datos del Cliente" client={ client } />
							</div>
							<div className="col">
								<CompanyView title="Datos de la Empresa" company={ company }/>
							</div>
						</div>

						<ListItemsView title="Productos de la Factura" items={ items }/>
						<TotalView total={ total } />
						<form className="w-50" onSubmit={event => onInvoiceItemSubmit(event)}>
							<input value={ product } type="text" className="form-control m-3" onChange={ onInputChange } name="product" placeholder="Producto"/>
							<input value={ price } type="text" className="form-control m-3" onChange={ event => onInputChange(event) } name="price" placeholder="Precio"/>
							<input value={ quantity } type="text" className="form-control m-3" onChange={ onInputChange } name="quantity" placeholder="Cantidad"/>

							<button className="btn btn-primary m-3" type="submit">Nuevo Item</button>
						</form>
					</div>
				</div>
            </div>
        </>
    )
}