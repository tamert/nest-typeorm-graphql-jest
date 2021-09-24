import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { green, rainbow } from 'colors/safe';

interface Product {
    title: string;
    code?: string;
    isActive: boolean;
}

interface User {
    title: string;
    size?: number;
    body: string;
}

class Writer implements User {
    products: Record<string, Product> = {};
    specials: Record<string, Set<string>> = {};
    body: string;
    title: string;
}

const skills: Set<string> = new Set();
skills.add('python');
skills.add('js');
skills.add('php');

interface Book {
    id: number;
    title: string;
    header?: string;
    body: string;
    date?: Date;
}

class Write {
    name: string | null = null;
    books: Record<'famous' | 'infamous', Book> = { famous: null, infamous: null };
}

const data: Write = new Write();
data.name = 'Douglas Adams';
data.books['famous'] = {
    id: 1,
    title: 'The Ultimate Hitchhiker`s Guide',
    body: 'Seconds before the Earth is demolished for a galactic freeway, Arthur Dent is saved by Ford Prefect, a researcher for the revised Guide. Together they stick out their thumbs to the stars and begin a wild journey through time and space. The Restaurant at the End of the Universe',
};

/**
 Writer: {
        "name": "Douglas Adams",
        "books": {
            "first": {
            "id": 1,
            "title": "The Ultimate Hitchhiker`s Guide",
            "body": "Seconds before the Earth is demolished for a galactic freeway, Arthur Dent is saved by
                Ford Prefect, a researcher for the revised Guide. Together they stick out their thumbs to the stars and
                begin a wild journey through time and space. The Restaurant at the End of the Universe"
            }
        }
    }
 */

/**
 * note:NODE_ENV=dev npx nestjs-command sample
 */
@Injectable()
export class PlaygroundCommand {
    @Command({
        command: 'playground',
        describe: 'it is a playground command',
    })
    async create() {
        const writer = new Writer();
        writer.title = 'title test';
        writer.products[0] = {
            title: 'test',
            isActive: true,
        };
        writer.specials['skill'] = skills;
        writer.body = 'body test';
        console.log(green(String(writer.specials.skill.has('js'))));
        console.info(rainbow('The playground command finishes with success!'));
    }
}
