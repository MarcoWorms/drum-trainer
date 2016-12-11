import React, { Component } from 'react'


function Note (props) {
  return (
    <div style={{
      backgroundColor: props
        .active
          ? props.enabled
            ? 'cyan'
            : '#efefef'
          : props.enabled
            ? 'blue'
            : '#f9f9f9',
      width: props.size,
      height: props.size,
      maxWidth: 70,
      maxHeight: 70,
      boxSizing:'border-box',
      border: 'solid 1px black'
    }}/>
  )
}

function Part (props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
      <span>{props.name}</span>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
        {props.notes.map((enabled, i) => <Note key={i} enabled={enabled} active={props.tick === i} size={props.size} /> )}
      </div>
    </div>
  )
}

function randomNotes (d) {
  return Array.from({ length: 8 }).map(() => Math.round(Math.random() - d))
}


const initialState = (d) => ({
  parts: {
    chimbau: randomNotes(d),
    caixa: randomNotes(d),
    bumbo: randomNotes(d),
  },
  windowWidth: window.innerWidth/10,
  tick: 0,
  bpm: 140,
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialState(0)
    window.addEventListener('resize', () => {
      this.setState({windowWidth: window.innerWidth/10})
    })
    window.setTimeout(() => this.nextTick(), 60000/this.state.bpm)
  }
  difficultyChanged(event) {
    event.target.checked = true
  }
  nextTick() {
    this.setState({ tick: (this.state.tick + 1) % 8 })
    window.setTimeout(() => this.nextTick(), 60000/this.state.bpm )
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
        <span>BPM</span><input type="number" defaultValue={this.state.bpm} onChange={(e) => this.setState({bpm: e.target.value})}></input>
        <div style={{marginTop: 10, marginBottom: 10}} />
        <Part name="Chimbau" notes={this.state.parts.chimbau} size={this.state.windowWidth} tick={this.state.tick}/>
        <Part name="Caixa" notes={this.state.parts.caixa} size={this.state.windowWidth} tick={this.state.tick}/>
        <Part name="Bumbo" notes={this.state.parts.bumbo} size={this.state.windowWidth} tick={this.state.tick}/>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
          <button style={{marginTop: 20}} onClick={() => this.setState(initialState(0.2))}>Easy</button>
          <button style={{marginTop: 20}} onClick={() => this.setState(initialState(0))}>Medium</button>
          <button style={{marginTop: 20}} onClick={() => this.setState(initialState(-0.3))}>Hard</button>
        </div>
      </div>
    )
  }
}

export default App

