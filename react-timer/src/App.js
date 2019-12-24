import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPause, faPlay, faStop, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(faPause, faPlay, faStop, faSyncAlt);

class App extends React.Component{
	constructor(props){
		super(props);
		this.runningClock = "";
		this.state = {
			timerRunning : "block",
			timerStopped : "none",
			timerValue: 0,
			timer: "00:00:00:00",
			time: 0
		}
	}

	pad(num){
		return ("0"+num).slice(-2);
	}

	setInitialState(){
		this.setState({
			timerRunning : "block",
			timerStopped : "none",
			timerValue: 0,
			timer: "00:00:00:00",
			time: 0
		})
	}

	updateTimer(){
		this.setState({
			time : this.state.timerValue * 100
		},this.showTime)
	}

	showTime(){
		var count = this.state.time;
		var ms = count%100; count=Math.floor(count/100); ms = this.pad(ms);
		var sec = count%60; count=Math.floor(count/60); sec = this.pad(sec);
		var min = count%60; count=Math.floor(count/60); min = this.pad(min);
		var hr = count%60; hr = this.pad(hr);
		var timer = hr+":"+min+":"+sec+":"+ms;
		this.setState({
			timer
		})
	}

	startTimer(){
		this.setState({
			timerRunning: "none",
			timerStopped: "block"
		})
		this.runningClock = setInterval(()=>{
			if(this.state.time === 0){
				clearInterval(this.runningClock);
				this.stopTimer(true);
				return;
			}
			this.setState({
				time: this.state.time - 1
			}, this.showTime)		
		},10)
	}

	stopTimer(isRefresh){
		clearInterval(this.runningClock);
		if(isRefresh){
			this.setInitialState();
			return;
		}
		this.setState({
			timerValue: Math.floor(this.state.time/100),
			timerRunning: "block",
			timerStopped: "none"
		})
	}

	onInput(value){
		if(value==="")
			value="0"
		this.setState({
			timerValue: parseInt(value)
		}, this.updateTimer)

	}

	render(){
		return (
			<div className="mainDiv">
				<div className="timer">
					<div className="time">
						<div className="runningTime">{this.state.timer}</div>
						<input type="text" className="input" autoFocus value={this.state.timerValue} onChange={(e)=>this.onInput(e.target.value)} style={{display: this.state.timerRunning}}></input>
					</div>
					<div className="btn-holder">
						<button className="leftBtn play" style={{display: this.state.timerRunning}} onClick={this.startTimer.bind(this)}>
							<FontAwesomeIcon icon={faPlay} />
						</button>
						<button className="leftBtn stop" style={{display: this.state.timerStopped}}  onClick={()=>this.stopTimer(false)}>
							<FontAwesomeIcon icon={faStop} />
						</button>
						<button className="rightBtn refresh" onClick={()=>this.stopTimer(true)}><FontAwesomeIcon icon={faSyncAlt} /></button>
					</div>
				</div>
			</div>
		)
	}
}

export default App;
