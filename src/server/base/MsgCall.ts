import { Logger } from "tsrpc-proto";
import { MsgService } from "../../models/ServiceMapUtil";
import { PrefixLogger } from "../models/PrefixLogger";
import { BaseCall, BaseCallOptions } from "./BaseCall";

export interface MsgCallOptions<Msg> extends BaseCallOptions {
    service: MsgService,
    msg: Msg
}
export abstract class MsgCall<Msg = any> extends BaseCall {
    readonly type = 'msg' as const;

    readonly service!: MsgService;
    readonly msg: Msg;

    constructor(options: MsgCallOptions<Msg>, logger?: Logger) {
        super(options, logger ?? new PrefixLogger({
            logger: options.conn.logger,
            prefixs: [`Msg:${options.service.name}`]
        }));

        this.msg = options.msg;
    }
}