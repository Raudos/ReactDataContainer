import React from 'react';
import { connect } from 'react-redux';

import DefaultErrorComponent from "./src/Error";
import DefaultLoaderComponent from './src/Loader';

export default (options = {}) => {
  const { Error, Loader, Redux, createInitialState, onCWRP, onMount, onUnmount, isError, isLoading } = options;

  const LoaderComponent = Loader || DefaultLoaderComponent;
  const ErrorComponent = Error || DefaultErrorComponent;

  return PassedComponent => {
    class Container extends React.Component {
      constructor(props) {
        super(props);

        const initialState = createInitialState ? createInitialState(this) : {};

        this.state = {
          ...initialState,
          containerError: false
        };
      };

      componentWillReceiveProps(nextProps) {
        onCWRP ? onCWRP(this, nextProps) : null;
      };

      componentDidMount() {
        onMount ? onMount(this) : null;
      };

      componentWillUnmount() {
        onUnmount ? onUnmount(this) : null;
      };

      componentDidCatch(error, info) {
        this.setState({
          containerError: {
            error,
            info
          }
        });
      };

      render() {
        const userToggledError = isError ? isError(this) : false;
        const containerDidError = userToggledError || this.state.containerError;

        const containerIsLoading = !containerDidError && isLoading ? isLoading(this) : false;

        if (containerDidError) {
          return <ErrorComponent {...this.props} containerState={this.state} error={containerDidError} />;
        } else if (containerIsLoading) {
          return <LoaderComponent {...this.props} containerState={this.state} loading={containerIsLoading} />;
        } else {
          return <PassedComponent {...this.props} containerState={this.state} transformedData={options.transformData ? options.transformData(this) : null} />;
        }
      };
    };

    return Redux ? connect(Redux.mapStateToProps ? Redux.mapStateToProps : () => ({}), Redux.actions)(Container) : Container;
  };
};
