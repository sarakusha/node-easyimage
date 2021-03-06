/*
 EasyImage

 EasyImage is a promise-based image processing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 Maintained by Kevin Gravier <http://github.com/mrkmg>

 MIT License
 */

import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import {mkdir} from "fs";
import "mocha";
import * as rimraf from "rimraf";

import {thumbnail} from "../../src/commands/thumbnail";

chai.use(chaiAsPromised);
chai.should();

const files = `${__dirname}/../files`;
const output = `${__dirname}/../output`;

describe("thumbnail command", () => {
    beforeEach((done: () => void) => {
        try {
            mkdir(output, done);
        } catch (e) {
            done();
        }
    });

    afterEach((done: () => void) => {
        rimraf(output, done);
    });

    it("should create a thumbnail", async () => {
        const info = await thumbnail({
            dst: `${output}/wide.png`,
            height: 100,
            src: `${files}/wide.png`,
            width: 100,
        });

        info.width.should.equal(100);
        info.height.should.equal(100);
    });
});
