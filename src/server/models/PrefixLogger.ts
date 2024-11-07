import { Logger } from 'tsrpc-proto';

export interface PrefixLoggerOptions {
    logger: Logger
    prefixs: (string | (() => string))[];
}

/**
 * Auto add prefix using existed `Logger`
 */
export class PrefixLogger implements Logger {

    readonly logger: PrefixLoggerOptions['logger'];
    readonly prefixs: PrefixLoggerOptions['prefixs'];

    constructor(options: PrefixLoggerOptions) {
        this.logger = options.logger;
        this.prefixs = options.prefixs;
    }

    private mergeArgs(prefix: string, args: any[]): any[] {
        if (prefix == ' ' || args.length == 0) return args
        if (typeof args[0] === 'object') {
            args[0].prefix = prefix
        } else {
            args.unshift({ prefix })
        }
        return args
    }

    getPrefix(): string {
        return this.prefixs.map(v => typeof v === 'string' ? v : v()).join(' ');
    }

    log(...args: any[]) {
        this.logger.log(...this.mergeArgs(this.getPrefix(), args));
    }

    debug(...args: any[]) {
        this.logger.debug(...this.mergeArgs(this.getPrefix(), args));
    }

    warn(...args: any[]) {
        this.logger.warn(...this.mergeArgs(this.getPrefix(), args));
    }

    error(...args: any[]) {
        this.logger.error(...this.mergeArgs(this.getPrefix(), args));
    }

}