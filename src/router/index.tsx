import { Route, Routes } from "react-router-dom"
import Home from "../page/home"
import About from "../page/about"
import Music from "../page/music"

const SelfRouter = () => {
  return (
		<Routes>
			<Route index element={<Home />} />
			<Route path='about' element={<About />} />
			<Route path="music" element={<Music />} />
		</Routes>
	)
}

export default SelfRouter