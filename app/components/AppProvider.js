import React from 'react';
export const AppContext = React.createContext();

export default class AppProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'Nick'
    }
  }
  
  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          setName: (name) => { this.setState({ name }) }
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
