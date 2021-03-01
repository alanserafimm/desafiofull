import { routes, routesResources } from "./routes";
import { KoaServer } from "./tools/koa-server/koa";



export const koaServer = new KoaServer();
koaServer.initResources(routesResources);
koaServer.initRoutes(routes);
koaServer.init();