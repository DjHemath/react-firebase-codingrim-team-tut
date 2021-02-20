
import React, { Component } from 'react'
import { db } from './firebase';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: 0,
            products: []
        }
    }

    componentDidMount() {
        db.collection("Products").get()
        .then(data => {

        })
        .catch(err => console.log(err))

        db.collection("Products").onSnapshot(snap => {
            const products = snap.docs.map(datum => datum.data());
            console.log(products);
            this.setState({products})
        });
    }

    handleChange = (event) => {
        const value = event.target.value;
        const id = event.target.id;
        this.setState(
            {
                [id]: value
            }
        )
    }

    handleSubmit = () => {

        const product = {
            name: this.state.name,
            price: this.state.price
        };

        const randomId = db.collection("Products").doc().id;

        db.collection("Products").doc(randomId).set({...product, id: randomId})
        .then(res => {
            this.setState({
                products: [...this.state.products, product]
            });
            this.setState({name: '', price: 0})
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleDelete = (id) => {
        db.collection("Products").doc(id).delete()
        .then(res => {
            console.log("deleted")
        });
    }

    render() {

        const products = this.state.products.map(product => {
            return (<p key={product.id || Math.random()}>
                    <span>{product.name}</span> &nbsp;
                    <span>{product.price}</span>
                    <button onClick={() => this.handleDelete(product.id)}>Delete</button>
                </p>)
        })

        return (
            <div>
                <input  id="name" onChange={this.handleChange} value={this.state.name} type="text" placeholder="product name" />
                <input  id="price" onChange={this.handleChange} value={this.state.price} type="number" placeholder="price" />
                <button onClick={this.handleSubmit} type="submit">submit</button>
                

                <div>
                    {products}
                </div>
            </div>
        )
    }
}

export default Product
