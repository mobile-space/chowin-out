import React from 'react';
export const AppContext = React.createContext();

export default class AppProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'Nick',
      latitude: null,
      longitude: null,
      error: null,
      isLoading: true,
      updatedFood: null,
    }
  }
  
  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          setName: (name) => { this.setState({ name }) },
          setLatitude: (latitude) => { this.setState({ latitude }) },
          setLongitude: (longitude) => { this.setState({ longitude }) },
          setError: (error) => { this.setState({ error }) },
          setIsLoading: (isLoading) => { this.setState({ isLoading }) },
          setUpdatedFood: (updatedFood) => { this.setState({ updatedFood }) },

        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
