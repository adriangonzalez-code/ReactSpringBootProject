import { useState } from "react";
import { getInvoice } from "./services/getInvoice";
import { InvoiceView } from "./components/InvoiceView";
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";

export const InvoiceApp = () => {

    const { total, id, name, client, company, items: itemsInitial } = getInvoice();

	const [productValue, setProductValue] = useState('');
	const [priceValue, setPriceValue] = useState(0);
	const [quantityValue, setQuantityValue] = useState(0);
	const [items, setItems] = useState(itemsInitial);


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
						<form className="w-50" onSubmit={event => {
							event.preventDefault();
							setItems([...items, {key: 4, product: productValue, price: priceValue, quantity: quantityValue}]);
						}}>
							<input type="text" className="form-control m-3" onChange={event => {
								console.log(event.target.value);
								setProductValue(event.target.value);
							}} name="product" placeholder="Producto"/>
							<input type="text" className="form-control m-3" onChange={event => {
								console.log(event.target.value);
								setPriceValue(event.target.value);
							}} name="price" placeholder="Precio"/>
							<input type="text" className="form-control m-3" onChange={event => {
								console.log(event.target.value);
								setQuantityValue(event.target.value);
							}} name="quantity" placeholder="Cantidad"/>

							<button className="btn btn-primary" type="submit">Crear Item</button>
						</form>
					</div>
				</div>
            </div>
        </>
    )
}