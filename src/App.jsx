import "./App.css"

import ButtonComp from "./components/ButtonComp"
import { useContext } from "react"
import { CountContext } from "./context/CountContext"
import HeaderComp from "./components/HeaderComp"

function App() {
	const { count, setCount } = useContext(CountContext)

	const user = null // change this to later to the use context user ❗

	const handleClick = () => {
		setCount((prev) => prev + 1)
	}

	const handleLogIn = () => {
	}

	return (
		<main
			className="app"
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "1em",
				backgroundColor: user ? "#024d1021" : "#4d020221",
				padding: ".5em",
			}}
		>
			<HeaderComp />
			<ButtonComp text="add" onclick={handleClick} />
			{count}
			{/* You'll need another button comp here later */}
			{user && <div className="alert">You are now logged in !!!</div>}
		</main>
	)
}

export default App
