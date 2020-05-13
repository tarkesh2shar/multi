import React, { lazy, Suspense } from "react"
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"
import "../index.scss"
import "../index.css"
import Experiment from "./experiment/experiment"

//import Test from './sample/test'
//Testing Lazy Loading

const Test = lazy(() => import("./sample/test"))

export default function App() {
	function WaitingComponent(Component) {
		return props => (
			<Suspense fallback={<div>Loading...</div>}>
				<Component {...props} />
			</Suspense>
		)
	}

	return (
		<div className="container mt-2">
			<BrowserRouter>
				<div className="routes">
					<Link to="/add">Route(/add)</Link>
					<Link to="/add/1">Route(/add/1)</Link>
					<Link to="/add/2">Route(/add/2)</Link>
					<Link to="/test">Route(test) --> using code splitting</Link>
					<Link to="/experiment">Experiment</Link>
				</div>
				<Switch>
					<Route path="/experiment" component={Experiment} />
					<Route
						path="/add"
						component={() => {
							return (
								<React.Fragment>
									header
									<br />
									<Switch>
										<Route exact component={() => "This is path ---> /add/2"} path="/add/2" />
										<Route exact component={() => "This is path ---> /add/1"} path="/add/1" />
										<Route component={() => "This is path ---> /add"} />
									</Switch>
									<br />
									footer
								</React.Fragment>
							)
						}}
					/>
					<Route component={WaitingComponent(Test)} path="/test" />
					<Route path="/" exact component={() => "This is path ---> /"} />
					<Route component={() => "Page NOT foUND"} />
				</Switch>
			</BrowserRouter>
		</div>
	)
}
