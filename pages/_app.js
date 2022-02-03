import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import InitailState from "../components/InitailState";
import store from "../redux/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Provider store={store}>
        <InitailState />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
