import React, { FC } from "react";
import { SnackbarProvider } from "notistack";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import store from "@/store";
import dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc";
import customParseFormatPlugin from "dayjs/plugin/customParseFormat";
// import { SnackbarCloseButton } from "@/modules/uikit/_private/components/snackbar-close-button";
import { Main } from "@/modules/main";
import GlobalFunctionality from "@/app/globalFunctionality";
import { ConfigProvider } from "antd";
import ErrorFallback from "./errorFallback";
import { ApiProvider } from "./api-provider";

import "@xyflow/react/dist/style.css";
import "./app.scss";

dayjs.extend(customParseFormatPlugin);
dayjs.extend(utcPlugin);

const App: FC = () => (
  <Provider store={store}>
    <ConfigProvider>
      <ApiProvider>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            window.location.reload();
          }}
        >
          <SnackbarProvider
            maxSnack={3}
            preventDuplicate
            hideIconVariant
            // action={(snackbarKey) => (
            //   <SnackbarCloseButton snackbarKey={snackbarKey} />
            // )}
          >
            <GlobalFunctionality />
            <Main />
          </SnackbarProvider>
        </ErrorBoundary>
      </ApiProvider>
    </ConfigProvider>
  </Provider>
);

export default App;
