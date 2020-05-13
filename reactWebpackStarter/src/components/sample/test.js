import React, { useEffect } from "react"
import "./index.scss"
import Image from "../../../assets/2.jpg"

export default function Test() {
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/todos/1")
			.then(response => response.json())
			.then(json => console.log(json))
	}, [])

	return (
		<React.Fragment>
			<div className="test__flex">Test Here </div>
			<img src={Image} alt="" height={400} width={400} srcSet="" />
		</React.Fragment>
	)
}
