/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import "axios";

declare module "axios" {
  interface AxiosStatic {
    config: { _retry: boolean };
  }
}
