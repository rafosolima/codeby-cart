import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import ProductCard from './components/ProductCard';
function App() {
  const [resultJson, setResultJson] = useState();
  const [total, setTotal] = useState(0);
  const {REACT_APP_ABAIXO_DE_10} = process.env;
  useEffect(() => {
    getJson();
  }, [])

  const getJson = async () => {
    let baseURL = './api-json/acima-10-reais.json';
    if(REACT_APP_ABAIXO_DE_10) {
      baseURL = './api-json/abaixo-10-reais.json';
    }
    const response = await fetch(baseURL, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const json = await response.json();
    setResultJson(json);
    setTotal(json.totalizers[0].value + json.totalizers[1].value);
  }
  const moneyFormat = (price = 0) => {
    price = String(price);
    const decimal = price.substring(price.length - 2, price.length);
    price = price.substring(0, price.length - 2);
    return `R$ ${price},${decimal}`;
  }

  return (
    <div className="app">
      <div className="container">
        <div className="card">
            <h3>Meu carrinho</h3>
            <hr />
            {(resultJson?.items || []).map((data, i) => 
              <ProductCard 
                key={i}
                imageUrl={data.imageUrl}
                name={data.name}
                priceOld={data.price}
                price={data.sellingPrice}
              >
              </ProductCard>)}
            <hr />
            <div className="total">
              <span>Total:</span>
              <span>{moneyFormat(total)}</span>
            </div>
            <div className={`mensagem ${total <= 1000 ? '' : 'hidden'}`}>
              <span>Parabéns, usa compra tem frete grátis!</span>
            </div>
            <hr></hr>
            <div className="footer-button">
              <button className="btn btn-primary" onClick={() => {
                Swal.fire({
                  title: 'UHUUU!',
                  text: 'Compra finalizada com sucesso!',
                  icon: 'success',
                  confirmButtonText: 'Continuar'
                })
              }}>Finalizar compra</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default App;
