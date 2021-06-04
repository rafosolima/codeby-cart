export default function ProductCard(props) {
  const moneyFormat = (price = 0) => {
    price = String(price);
    const decimal = price.substring(price.length - 2, price.length);
    price = price.substring(0, price.length - 2);
    price = `${price},${decimal}`.padStart(4, '0');
    return `R$ ${price}`;
  }
  return (
    <>
      <div className="productCard">
        <img src={`${props.imageUrl}`} />
        <div className="item">
          <span className="label">{props.name}</span>
          <span className="priceOlder">{moneyFormat(props.priceOld)}</span>
          <span className="price">{moneyFormat(props.price)}</span>
        </div>
      </div>
    </>
  )
}