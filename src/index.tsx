import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { IntlProvider, LOCALES } from "./intl";
import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <Provider>
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale={LOCALES.ENGLISH_GB}>
        <Router>
          <App />
        </Router>
      </IntlProvider>
    </QueryClientProvider>
  </Provider>,

  document.getElementById("dekked-app")
);
