import Koa from 'koa';
import { mongoDB } from '../mongoose/mongoose.class'
import { config } from '../../config/config';
import { GenericController } from '../generic/generic-controller';

const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const Router = require('koa-router');
const cors = require('@koa/cors');

export class KoaServer {

    private router: any;
    private app: Koa;

    constructor() {
        this.app = module.exports = new Koa();
        this.app.use(koaBody());
        this.app.use(koaLogger());
        this.app.use(cors());

        this.app.use(async (ctx, next) => {
            try { await next() }
            catch (err) {
                ctx.status = err.status || 500;
                ctx.body = {
                    success: false,
                    message: "Erro interno. Contate o administrador do sistema!",
                    modelState: { messageBody: err.stack }
                };

                ctx.app.emit('error', err, ctx);
            }
        });

        mongoDB.init();

        this.app.on('error', async (err, ctx) => { });
        this.router = new Router();
        this.router.get('/', async (ctx: any) => { ctx.body = { status: 'success', message: 'Servidor Online' }; });

    };

    public initRoutes(controllers: GenericController[]) {

        for (let controller of controllers) 
            controller.applyRoutes(this.router);

        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());

        console.log(this.router.stack.map((i: any) => i.path));
    }

    init() {
        this.app.listen(config.server.port);
        console.log(`Koa online na porta ${config.server.port}`)
    }

    public async initResources(resources: any[]) {
        for (var resource of resources) {
            await resource.register();
        };
    };

};