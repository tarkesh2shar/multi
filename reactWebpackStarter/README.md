# reactWebpackStarter

**A development Server for React using Web pack**

## Installation

```
git clone
cd reactWebpackStarter
npm install
```

**_start development Server_**

```
npm run start
```

**_generate Static assets_**

```
 npm run build
```

# Features

**Automatic proxy** for all ajax network calls starting with /api to **_http://localhost:2000/api_** <br /> **In built** support for scss , css <br /> **Code format** with Prettier and VScode (**_required_** to install prettier extensions for vs code ) <br /> **Code Splitting and Bundle splitting** All the dependencies have their own seperate chunks , and support for lazy loading which produces a different chunk too <br /> **Hot reloading for javascript and css/scss** <br /> **1 css per js import** (in case of lazy loading) css gets **_splits_** else it is converged into the **_main_** css file <br /> **CSS autoprefixer**

## Usage

```
import '../index.scss'
```

```
import '../index.css'
```

```
import Image from '../../../assets/1.jpg'
<img src={Image} alt='' height={100} width={100} srcset='' />
```

```
import React, { lazy, Suspense } from 'react'
const Test = lazy(() => import('./sample/test'))
function WaitingComponent(Component) {
 return props => (
	<Suspense fallback={<div>Loading...</div>}>
		<Component {...props} />
	</Suspense>)
```

```
<Route component={WaitingComponent(Test)} path='/test' />
```
**Running in a docker container**
```
git clone
cd reactWebpackStarter
docker-compose up 

```

## Known issues ##
```'image-webpack-loader'``` 
needs to be disable to work on docker **Issue** **https://github.com/tcoopman/image-webpack-loader/issues/124**
<br/>
```"singleQuote": false```
this needs to be false because **Dockerfile** doesnt like single quotes 

## Thats it 

**_Feel free to generate a PR to this development react-webpack-server_** :)

