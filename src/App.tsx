import Footer from "./component/footer"
import Header from "./component/header"
import SelfRouter from "./router"

function App() {

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      <Header/>
      <SelfRouter />
      <div style={{marginTop:'auto'}}>
        <Footer />
      </div>
    </div>
  )
}

export default App
