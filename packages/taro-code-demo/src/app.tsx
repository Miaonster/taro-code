import React from 'react'
import './app.css'

class App extends React.Component {
  render (): React.ReactNode {
    return this.props.children
  }
}

export default App
