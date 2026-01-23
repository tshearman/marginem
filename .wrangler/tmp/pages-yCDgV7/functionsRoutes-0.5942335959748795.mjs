import { onRequestPost as __api_subscribe_ts_onRequestPost } from "/Users/toby/projects/blogupdate/src/functions/api/subscribe.ts"
import { onRequestGet as __api_subscribe_confirm_ts_onRequestGet } from "/Users/toby/projects/blogupdate/src/functions/api/subscribe-confirm.ts"
import { onRequestPost as __api_unsubscribe_ts_onRequestPost } from "/Users/toby/projects/blogupdate/src/functions/api/unsubscribe.ts"
import { onRequestGet as __api_unsubscribe_confirm_ts_onRequestGet } from "/Users/toby/projects/blogupdate/src/functions/api/unsubscribe-confirm.ts"
import { onRequestPost as __api_unsubscribe_request_ts_onRequestPost } from "/Users/toby/projects/blogupdate/src/functions/api/unsubscribe-request.ts"

export const routes = [
    {
      routePath: "/api/subscribe",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_subscribe_ts_onRequestPost],
    },
  {
      routePath: "/api/subscribe-confirm",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_subscribe_confirm_ts_onRequestGet],
    },
  {
      routePath: "/api/unsubscribe",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_unsubscribe_ts_onRequestPost],
    },
  {
      routePath: "/api/unsubscribe-confirm",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_unsubscribe_confirm_ts_onRequestGet],
    },
  {
      routePath: "/api/unsubscribe-request",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_unsubscribe_request_ts_onRequestPost],
    },
  ]