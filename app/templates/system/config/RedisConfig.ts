/// <reference path="../OX" />

module OX {

    export interface RedisClientOpts {
        parser: string;
        return_buffers?: boolean;
        detect_buffers?: boolean;
        socket_nodelay?: boolean;
        no_ready_check?: boolean;
        enable_offline_queue?: boolean;
        retry_max_delay?: number;
        connect_timeout?: number;
        max_attempts?: number;
        auth_pass?: boolean;
    }

    export interface RedisInfo {
        port: number;
        host: string;
        options?: RedisClientOpts;
    }

    export interface RedisConfig {
        config(config:ConfigEnv<RedisInfo>):void;
    }

}
