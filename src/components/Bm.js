import '../styles/Bm.css';
import PropTypes from 'prop-types';
import { Component } from 'react';
class Bm extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        const { name, ville, cover } = this.props;
    return(
        <div className = 'lmj-bm'>
            <img className = 'lmj-bm-cover' src={cover} alt={name} />
            <span>{ville}</span>
            <h3>{name}</h3>
        </div>
    )
}
}
Bm.propTypes = {
    name: PropTypes.string,
    ville: PropTypes.string,
    cover: PropTypes.string,
}
Bm.defaultProps = {
    name: 'Nom du beatmaker',
    ville: 'Ville du beatmaker',
    cover: './user/samylouchahi/Documents/PROJETWEB/backend/public/images/AmineFarsi.png',
}
export default Bm;