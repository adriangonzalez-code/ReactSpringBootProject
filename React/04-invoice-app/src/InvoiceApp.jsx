import { useState, useEffect } from "react";
import { getInvoice, calculateTotal } from "./services/getInvoice";
import { InvoiceView } from "./components/InvoiceView";
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";
import { FormItemView } from "./components/FormItemView.jsx";

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

	const [ activeForm, setActiveForm ] = useState(false);

	const [total, setTotal] = useState(0);

	const [counter, setCounter] = useState(4);

	const [invoice, setInvoice] = useState(invoiceInitial);

	const [items, setItems] = useState([]);

	const { id, name, client, company } = invoice;

	useEffect(() => {
		const data = getInvoice();
		console.log(data);
		setInvoice(data);
		setItems(data.items);
	}, []);

	useEffect(() => {
		setTotal(calculateTotal(items));
	}, [items]);

	const handlerAddInvoiceItems = ({ product, price, quantity }) => {

		setItems([...items, {
			id: counter,
			product: product.trim(),
			price: +price.trim(),
			quantity: parseInt(quantity.trim(), 10)
		}]);

		setCounter(counter + 1);
	}

	const handlerDeleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    }

	const onActiveForm = () => {
		setActiveForm(!activeForm);
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
						<ListItemsView title="Productos de la Factura" items={ items } handlerDeleteItem={ id => handlerDeleteItem(id) }/>
						<TotalView total={ total } />
						<button className="btn btn-secondary" onClick={ onActiveForm }>{ !activeForm ? 'Agregar Item' : 'Ocultar Formulario' }</button>
						{ !activeForm || <FormItemView handler={ (newItem) =>  handlerAddInvoiceItems(newItem) }/> }
					</div>
				</div>
            </div>
        </>
    )
}