import { server as _server } from "@hapi/hapi";
import { routes } from "./routes.js";

const init = async () => {
    const server = _server({
        port: 5000,
        host: "localhost",
        routes: {
            cors: {
                origin: ["http://notesapp-v1.dicodingacademy.com"],
            },
        },
    });
    server.route(routes);
    await server.start();
    console.log(`server is running at ${server.info.uri}`);
};

init();
