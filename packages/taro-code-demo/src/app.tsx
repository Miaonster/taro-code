import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import './app.css'

class App extends React.Component {
  public static propTypes: InferProps<{}>

  public render(): React.ReactNode {
    return this.props.children
  }
}

App.propTypes = {
  children: PropTypes.node
}

export default App
