import React, { useState, useEffect } from "react"

export default function experiment() {
	const [state, setState] = useState({
		email: "",
		name: "",
	})
	const [redisData, setredisData] = useState({})
	const [data, setdata] = useState([])

	useEffect(() => {
		fetchData()
		fetchDataFromRedis()
	}, [])

	async function fetchData() {
		let raw = await fetch("/api/allSamples")
		let res = await raw.json()
		setdata(res)
	}
	async function fetchDataFromRedis() {
		let raw = await fetch("/api/fromRedis")
		let res = await raw.json()
		setredisData(res)
	}

	function renderListOfData() {
		return data.map(data => {
			return (
				<div>
					{data.name} : {data.email}
				</div>
			)
		})
	}

	async function addSampleToDatabase() {
		await fetch("/api/addSample", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({ ...state }),
		})
		fetchData()
		setState({ email: "", name: "" })
	}

	const renderRedisData = () => {
		console.log(redisData[0])

		let x = []
		for (var key in redisData) {
			x.push(
				<div>
					{key}:{redisData[key]}
				</div>,
			)
		}
		return x
	}

	return (
		<div>
			<br />
			LIST OF SAMPLES FROM MONGO DATABASE:
			{renderListOfData()}
			DATA FROM REDIS:
			{renderRedisData()}
			<form action="" onSubmit={e => e.preventDefault()}>
				<input
					type="email"
					value={state.email}
					onChange={e => setState({ ...state, email: e.target.value })}
				/>
				<br />
				<input
					type="text"
					value={state.name}
					onChange={e => setState({ ...state, name: e.target.value })}
				/>
				<br />
				<button onClick={addSampleToDatabase}>Add sample</button>
			</form>
		</div>
	)
}
