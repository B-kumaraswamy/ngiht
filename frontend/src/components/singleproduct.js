function SingleProductComponent(props) {
    const {imageUrl, title, price, vendor} = props.product
    return (
        <li className="cart-container">
        
            
            <img src = {imageUrl} alt = "loading" width = "20%"/>
            
            <h1 className="cart-heading">{title}</h1>
            <p className="cart-price">{`${price}/-`}</p>
            <p className="cart-vendor">{vendor}</p>
          
       
        </li>
    )
}


export default SingleProductComponent;
