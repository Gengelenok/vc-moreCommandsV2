//#region LICENSE
/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated, Samu and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
//#endregion

//#region Imports
import { findOption, OptionalMessageOption, RequiredMessageOption, sendBotMessage, registerCommand, ApplicationCommandOptionType } from "@api/Commands";
import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
//#endregion

function startFunc() {
    for (const key in dictOfCommands) {
        if (dictOfCommands.hasOwnProperty(key)) {
            const item = dictOfCommands[key];
            if (settings.store[item.name]) {
                enableCommand(item);
            }
    }
  }
}

//#region Functions for commands

function MirrorH(input: string): string {
    const flipTable: { [key: string]: string } = {
        'a': 'ɐ',
        'b': 'q',
        'c': 'ɔ',
        'd': 'p',
        'e': 'ǝ',
        'f': 'ɟ',
        'g': 'ƃ',
        'h': 'ɥ',
        'i': 'ı',
        'j': 'ɾ',
        'k': 'ʞ',
        'l': 'ן',
        'm': 'ɯ',
        'n': 'u',
        'p': 'd',
        'q': 'ᕹ',
        'r': 'ɹ',
        't': 'ʇ',
        'u': 'n',
        'v': 'ʌ',
        'w': 'ʍ',
        'y': 'ʎ',
        '.': '˙',
        '[': ']',
        '(': ')',
        '{': '}',
        '?': '¿',
        '!': '¡',
        "'": ',',
        '<': '>',
        '_': '‾',
        '‿': '⁀',
        '⁅': '⁆',
        '∴': '∵',
        '\r': '\n',
        'а': 'ɐ',
        'б': 'ƍ',
        'в': 'ʚ',
        'г': 'ɹ',
        'д': 'ɓ',
        'е': 'ǝ',
        'ё': 'ǝ',
        'ж': 'ж',
        'з': 'ε',
        'и': 'и',
        'й': 'ņ',
        'к': 'ʞ',
        'л': 'v',
        'м': 'w',
        'н': 'н',
        'о': 'о',
        'п': 'u',
        'р': 'd',
        'с': 'ɔ',
        'т': 'ɯ',
        'у': 'ʎ',
        'ф': 'ȸ',
        'х': 'х',
        'ц': 'ǹ',
        'ч': 'Һ',
        'ш': 'm',
        'щ': 'm',
        'ъ': 'q',
        'ы': 'ıq',
        'ь': 'q',
        'э': 'є',
        'ю': 'oı',
        'я': 'ʁ'
    };

    return input
        .split('')
        .map(char => flipTable[char.toLowerCase()] || char)
        .reverse()
        .join('');
}

function mock(input: string, ctx: any): string {
    let output = "";
    let nonSpaceIndex = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === " ") {
            output += " ";
        } else {
            output += nonSpaceIndex % 2 ? input[i].toUpperCase() : input[i].toLowerCase();
            nonSpaceIndex++;
        }
    }
    return output;
}

function fall(input: string, ctx: any): string {
    return input.split('').join('\n');
}

function hide(input: string, ctx: any): string {
    return input.split('').map(char => `||${char}||`).join('');
}

function toi(input: string, ctx: any): string {
    console.log(input);
    
    const vowelsToReplace = /[ауоиэыёеАУОИЭЫЁЕ]/g;
    const result = input.replace(vowelsToReplace, 'і');
    
    console.log(result);
    return result;
}
	
function rndText(input: string, ctx: any): string {
    const number = parseInt(input, 10);
    if (!isNaN(number)) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ1234567890';
        let result = '';
        for (let i = 0; i < number; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }
	else {
        return " ";
    }
}

function rndTextOnlyEng(input: string, ctx: any): string {
    const number = parseInt(input, 10);
    if (!isNaN(number)) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        let result = '';
        for (let i = 0; i < number; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }
	else {
        return " ";
    }
}

function echo(input: string, ctx: any): any {
    sendBotMessage(ctx.channel.id, { content: input });
    return " ";
}

function MirrorV(input: string, ctx: any): string {
    return input.split('').reverse().join('');
}

//#endregion


const dictOfCommands = {
    rnd: {
        name: "rnd",
        desc: "Creates a random string using a mix of English letters, Russian letters, and numbers",
        func: rndText,
        optName: "count",
        optDesc: "Count of symbols to generate",
        optType: ApplicationCommandOptionType.INTEGER
    },
    rndE: {
        name: "rndEnglish",
        desc: "Generates a random string with only English letters and numbers",
        func: rndTextOnlyEng,
        optName: "count",
        optDesc: "Count of symbols to generate",
        optType: ApplicationCommandOptionType.INTEGER
    },
    toi: {
        name: "toi",
        desc: "A command for Russian users that swaps vowels with 'і,' inspired by the Кріб meme",
        func: toi,
        optName: "message",
        optDesc: "Text",
        optType: ApplicationCommandOptionType.STRING
    },
    fall: {
        name: "fall",
        desc: "Turns your text into a vertical stack",
        func: fall,
        optName: "message",
        optDesc: "Text",
        optType: ApplicationCommandOptionType.STRING
    },
    hide: {
        name: "hide",
        desc: "Conceals each letter of your text under its own spoiler",
        func: hide,
        optName: "message",
        optDesc: "Text",
        optType: ApplicationCommandOptionType.STRING
    },
    mock: {
        name: "mock",
        desc: "Transforms your text into a quirky style, like tHiS eXaMpLe",
        func: mock,
        optName: "message",
        optDesc: "Text",
        optType: ApplicationCommandOptionType.STRING
    },
    echo: {
        name: "echo",
        desc: "Sends a virtual message from the bot 'Clyde' that only you can see",
        func: echo,
        optName: "message",
        optDesc: "TEXT",
        optType: ApplicationCommandOptionType.STRING
    },
    mirrorV: {
        name: "mirrorV",
        desc: "Flips your text backward, e.g., Example becomes elpmaxE",
        func: MirrorV,
        optName: "message",
        optDesc: "TEXT",
        optType: ApplicationCommandOptionType.STRING
    },
    mirrorH: {
        name: "mirrorH",
        desc: "Inverts your text upside down, e.g., Example becomes ǝןdɯɐxǝ",
        func: MirrorH,
        optName: "message",
        optDesc: "TEXT",
        optType: ApplicationCommandOptionType.STRING
    },
};

const settings = definePluginSettings(
    Object.fromEntries(
        Object.entries(dictOfCommands).map(([key, command]) => [
            command.name,
            {
                type: OptionType.BOOLEAN,
                description: `Enable or disable /${command.name} command. ${command.desc}`,
                restartNeeded: true,
                default: true
            }
        ])
    )
);

function enableCommand(dict: { [key: string]: any }) {
    registerCommand({
        name: dict["name"],
        description: dict["desc"],
        options: [
            {
                name: dict["optName"],
                description: dict["optDesc"],
                type: dict["optType"],
                required: true
            }
        ],
        execute: (opts, ctx) => ({
            content: typeof dict["func"] === "function"
            ? dict["func"](findOption(opts, dict["optName"], ""), ctx)
            : "Error: Function not found"
        }),
    }, "MoreCommands V2");
}


export default definePlugin({
    name: "MoreCommands V2",
    description: "Remake of plugin MoreCommands",
    authors: [{ name: "Mishonok", id: 860957238246899772n }],
    settings,
    start() {
        startFunc();
    }
});
