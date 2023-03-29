import { Fragment } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Buyflow from './buyflow/Buyflow'

// Define the shape of a step object
export type Step = {
  name: string;
}

const App = () => {

  // Define the shape of a product configuration object
  type ProductConfig = {
    name: string;
    path: string;
    steps: Step[];
  }

  // Define a type to represent multiple product configurations
  type ProductsConfig = {
    [key: string]: ProductConfig;
  }

  // Define the configuration for each product
  const productsConfig: ProductsConfig = {
    devIns: {
      name: 'Developer Insurance',
      path: 'insurance_dev',
      steps: [
              { name: 'email' }, 
              { name: 'age' }, 
              { name: 'summary' }
            ],
    },
    desIns: {
      name: 'Designer Insurance',
      path: 'insurance_des',
      steps: [
              { name: 'email' }, 
              { name: 'fullName'}, 
              { name: 'age' }, 
              { name: 'summary' }
            ],
    },
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Switch>

          {Object.entries(productsConfig).map(([productId, product]) => (
            <Route key={productId} path={`/buy/${product.path}`}>
              <Buyflow productId={productId} productName={product.name} steps={product.steps} />
            </Route>
          ))}

          <Route path="/">
            {Object.entries(productsConfig).map(([productId, product]) => (
              <Fragment key={productId}>
                <p>Welcome to Getsafe's {product.name}</p>
                <Link to={`/buy/${product.path}`}>Get started!</Link>
              </Fragment>
            ))}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
