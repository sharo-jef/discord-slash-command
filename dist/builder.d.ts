import { ApplicationCommandOptionType } from "./enums";
export declare function builder(name: string, description?: string): CommandBuilder;
export declare class CommandBuilder {
    private _command;
    constructor(name: string, description?: string);
    name(name: string): CommandBuilder;
    description(description: string): CommandBuilder;
    option(option: (option: ApplicationCommandOption) => ApplicationCommandOption): CommandBuilder;
    defaultPermission(defaultPermission: boolean): CommandBuilder;
    get command(): unknown;
}
export declare class ApplicationCommand {
    private _name;
    private _description;
    private _options;
    private _defaultPermission;
    constructor(name: string, description?: string);
    name(name: string): ApplicationCommand;
    description(description: string): ApplicationCommand;
    option(option: (option: ApplicationCommandOption) => ApplicationCommandOption): ApplicationCommand;
    defaultPermission(defaultPermission: boolean): ApplicationCommand;
    get command(): unknown;
}
export declare class ApplicationCommandOption {
    private _name;
    private _type;
    private _description;
    private _required;
    private _choices;
    private _options;
    constructor(name?: string);
    name(name: string): ApplicationCommandOption;
    type(type: ApplicationCommandOptionType): ApplicationCommandOption;
    description(description: string): ApplicationCommandOption;
    required(required: boolean): ApplicationCommandOption;
    choice(choice: (choice: ApplicationCommandOptionChoice) => ApplicationCommandOptionChoice): ApplicationCommandOption;
    option(option: (option: ApplicationCommandOption) => ApplicationCommandOption): ApplicationCommandOption;
    get command(): unknown;
}
export declare class ApplicationCommandOptionChoice {
    private _name;
    private _value;
    constructor(name?: string);
    name(name: string): ApplicationCommandOptionChoice;
    value(value: string | number): ApplicationCommandOptionChoice;
    get command(): unknown;
}
