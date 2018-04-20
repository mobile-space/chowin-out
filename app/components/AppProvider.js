import React from 'react';
export const AppContext = React.createContext();

export default class AppProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      isLoading: true,
      menuList: null
    }
  }
  
  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          setLatitude: (latitude) => { this.setState({ latitude }) },
          setLongitude: (longitude) => { this.setState({ longitude }) },
          setError: (error) => { this.setState({ error }) },
          setIsLoading: (isLoading) => { this.setState({ isLoading }) },
          setMenuList: (menuList) => {this.setState({menuList})}
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
