import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPause, faPlay, faStop, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faPause, faPlay, faStop, faSyncAlt);

class App extends React.Component{
	render(){
		return (
			<div className="mainDiv">
				<div className="timer">
					<div className="time">
						<div className="runningTime">Hello</div>
						<input></input>
					</div>
					<div className="btn-holder">
						<button className="leftBtn play"><FontAwesomeIcon icon={faPlay} /></button>
						<button className="leftBtn stop"><FontAwesomeIcon icon={faStop} /></button>
						<button className="rightBtn refresh"><FontAwesomeIcon icon={faSyncAlt} /></button>
					</div>
				</div>
			</div>
		)
	}
}

export default App;
