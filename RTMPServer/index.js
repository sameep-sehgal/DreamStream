const NodeMediaServer = require('node-media-server');

const config = (rtmpPort,httpPort) => {
    return {rtmp: {
        port: rtmpPort,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: httpPort,
        allow_origin: '*'
    }
    }
};

var nms = new NodeMediaServer(config(process.env.PORT||1935,process.env.PORT||8000))
nms.run();