import { Route, Routes } from "react-router-dom"
import Home from "../page/home"
import About from "../page/about"
import Music from "../page/music"
import Profile from "../page/profile"
import EChartComponent from "../page/chart"
import Phantom from "../page/phantom"

const SelfRouter = () => {
  return (
		<Routes>
			<Route index element={<Home />} />
			<Route path='about' element={<About />} />
			<Route path="music" element={<Music />} />
			<Route path="profile" element={<Profile />} />
			<Route path="chart" element={<EChartComponent />} />
			<Route path="phantom" element={<Phantom />} />
		</Routes>
	)
}

export default SelfRouter