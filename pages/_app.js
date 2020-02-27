import React from "react";
import NextApp from "next/app";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import CssBaseline from "@material-ui/core/CssBaseline";

import ScrollToTop from "../components/ScrollToTop";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";

import sideBarReducer from "../store/reducers/sidebar";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const rootReducer = combineReducers({
  sidebar: sideBarReducer
});

const makeStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

class App extends NextApp {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Nav />
          <Sidebar />
          <Component {...pageProps} />
          <ScrollToTop />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withRedux(makeStore)(App);
