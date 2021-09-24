import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { green, cyan } from 'colors/safe';
import { SingleBar } from 'cli-progress';

/**
 * note:NODE_ENV=dev npx nestjs-command sample
 */
@Injectable()
export class TestCommand {
    @Command({
        command: 'sample',
        describe: 'it is a test command',
    })
    async create() {
        // create a new progress bar instance and use shades_classic theme
        const bar1 = new SingleBar({
            format: 'CLI Progress |' + cyan('{bar}') + '| {percentage}% || {value}/{total} Chunks || Speed: {speed}',
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true,
        });
        bar1.start(200, 0);
        bar1.update(1);
        await new Promise((f) => setTimeout(f, 1000));
        bar1.update(2);
        await new Promise((f) => setTimeout(f, 1000));
        bar1.update(3);
        await new Promise((f) => setTimeout(f, 1000));
        bar1.update(4);
        await new Promise((f) => setTimeout(f, 1000));
        bar1.update(5);
        await new Promise((f) => setTimeout(f, 1000));
        bar1.update(6);
        await new Promise((f) => setTimeout(f, 1000));
        bar1.update(100);
        await new Promise((f) => setTimeout(f, 1000));
        bar1.update(150);
        await new Promise((f) => setTimeout(f, 1000));
        bar1.update(200);
        bar1.stop();
        console.info(green('The sample command finishes with success!'));
    }
}
