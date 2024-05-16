import { Route, Routes } from "react-router-dom"
import Home from "../page/home"
import About from "../page/about"

const SelfRouter = () => {
  return (
		<Routes>
			<Route index element={<Home />} />
			<Route path='about' element={<About />} />
		</Routes>
	)
}

export default SelfRouter