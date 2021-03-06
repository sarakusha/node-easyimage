/*
 EasyImage

 EasyImage is a promise-based image processing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 Maintained by Kevin Gravier <http://github.com/mrkmg>

 MIT License
 */
import * as Bluebird from "bluebird";
import {execute} from "../execute";
import {IBaseOptions} from "../options";
import {applyBaseOptionsToArgs, applyDefaultsToBaseOptions, checkForMissingOptions, ensureDestinationDirectoryExists} from "../utilities";
import {IInfoResult, info} from "./info";

Promise = Promise || Bluebird as any;

/**
 * Converts an image from one format to another.
 *
 * @param {IConvertOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
export async function convert(options: IConvertOptions): Promise<IInfoResult> {
    applyDefaultsToBaseOptions(options);
    checkForMissingOptions(options, ["src"]);

    await ensureDestinationDirectoryExists(options);

    const args: string[] = [options.src];

    applyBaseOptionsToArgs(options, args);

    args.push(options.dst);

    await execute("convert", args);
    return info(options.dst);
}

// tslint:disable-next-line
export interface IConvertOptions extends IBaseOptions {
}
