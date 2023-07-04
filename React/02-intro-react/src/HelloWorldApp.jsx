import PropTypes from "prop-types";
import { Title } from "./components/Title.jsx";
import { UserDetails } from "./components/UserDetails.jsx";
import { Book } from "./components/Book.jsx";

export const HelloWorldApp = ({ user, id, title, book }) => {
    // const name = 'Pepe';
    console.log(title);

    return (
        <>
            <Title title={ title }/>
            <UserDetails user={ user } id = { id }/>
            <Book book={ book }/>
        </>);
}

HelloWorldApp.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    user: PropTypes.object
}

HelloWorldApp.defaultProps = {
    title: 'Hola mundo por defecto',
    book: 'UML got a gota'
}