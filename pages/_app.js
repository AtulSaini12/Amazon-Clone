import "../src/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../src/app/store";

import { Provider as AuthProvider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
