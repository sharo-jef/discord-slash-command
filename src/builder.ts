/* eslint-disable camelcase */

export enum ApplicationCommandOptionType {
    SUBCOMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
}

export function builder(name: string): CommandBuilder {
    const builder = new CommandBuilder(name);
    return builder;
}

export class CommandBuilder {
    private _command: ApplicationCommand;
    constructor(name: string) {
        this._command = new ApplicationCommand(name);
    }
    name(name: string): CommandBuilder {
        this._command.name(name);
        return this;
    }
    description(description): CommandBuilder {
        this._command.description(description);
        return this;
    }
    options(options: (options: ApplicationCommandOptions) => ApplicationCommandOptions): CommandBuilder {
        this._command.options(options);
        return this;
    }
    defaultPermission(defaultPermission: boolean): CommandBuilder {
        this._command.defaultPermission(defaultPermission);
        return this;
    }
    get command(): unknown {
        return this._command.command;
    }
}

export class ApplicationCommand {
    private _name = '';
    private _description = '';
    private _options: ApplicationCommandOptions;
    private _defaultPermission = true;
    constructor(name: string) {
        this.name(name);
        this._description = '';
    }
    name(name: string): ApplicationCommand {
        if (!/^[\w-]{1,32}$/g.test(name)) {
            throw new Error(`want: /^[\\w-]{1,32}$/, got: ${name}`);
        }
        this._name = name;
        return this;
    }
    description(description: string): ApplicationCommand {
        this._description = description;
        return this;
    }
    options(options: (options: ApplicationCommandOptions) => ApplicationCommandOptions): ApplicationCommand {
        this._options = options(new ApplicationCommandOptions());
        return this;
    }
    defaultPermission(defaultPermission: boolean): ApplicationCommand {
        this._defaultPermission = defaultPermission;
        return this;
    }
    get command(): unknown {
        if (!this._name) {
            throw new Error('name is required');
        }
        if (!this._description) {
            throw new Error('description is required');
        }

        const ret = {} as {
            name: string,
            description: string,
            options: unknown,
            default_permission: boolean,
        };
        ret.name = this._name;
        ret.description = this._description;
        if (this._options) {
            ret.options = this._options.command;
        }
        if (this._defaultPermission) {
            ret.default_permission = this._defaultPermission;
        }
        return ret;
    }
}

export class ApplicationCommandOptions {
    private _options: ApplicationCommandOption[] = [];
    option(option: (option: ApplicationCommandOption) => ApplicationCommandOption): ApplicationCommandOptions {
        this._options.push(option(new ApplicationCommandOption()));
        return this;
    }
    get command(): unknown[] {
        return this._options.map(o => o.command);
    }
}

export class ApplicationCommandOption {
    private _name: string;
    private _type: ApplicationCommandOptionType;
    private _description: string;
    private _required: boolean;
    private _choices: ApplicationCommandOptionChoices;
    private _options: ApplicationCommandOptions;
    constructor(name = '') {
        if (name) {
            this._name = name;
        }
    }
    name(name: string): ApplicationCommandOption {
        this._name = name;
        return this;
    }
    type(type: ApplicationCommandOptionType): ApplicationCommandOption {
        this._type = type;
        return this;
    }
    description(description: string): ApplicationCommandOption {
        this._description = description;
        return this;
    }
    required(required: boolean): ApplicationCommandOption {
        this._required = required;
        return this;
    }
    choices(choices: (choices: ApplicationCommandOptionChoices) => ApplicationCommandOptionChoices): ApplicationCommandOption {
        this._choices = choices(new ApplicationCommandOptionChoices());
        return this;
    }
    options(options: (options: ApplicationCommandOptions) => ApplicationCommandOptions): ApplicationCommandOption {
        this._options = options(new ApplicationCommandOptions());
        return this;
    }
    get command(): unknown {
        if (!this._type) {
            throw new Error('type is required');
        }
        if (!this._name) {
            throw new Error('name is required');
        }
        if (!this._description) {
            throw new Error('description is required');
        }

        const ret = {} as {
            type: ApplicationCommandOptionType,
            name: string,
            description: string,
            required: boolean,
            choices: unknown[],
            options: unknown[],
        };
        ret.type = this._type;
        ret.name = this._name;
        ret.description = this._description;
        if (this._required) {
            ret.required = this._required;
        }
        if (this._choices) {
            ret.choices = this._choices.command;
        }
        if (this._options) {
            ret.options = this._options.command;
        }
        return ret;
    }
}

export class ApplicationCommandOptionChoices {
    private _choices: ApplicationCommandOptionChoice[] = [];
    choice(choice: (choice: ApplicationCommandOptionChoice) => ApplicationCommandOptionChoice): ApplicationCommandOptionChoices {
        this._choices.push(choice(new ApplicationCommandOptionChoice()));
        return this;
    }
    get command(): unknown[] {
        return this._choices.map(c => c.command);
    }
}

export class ApplicationCommandOptionChoice {
    private _name: string;
    private _value: string|number;
    constructor(name = '') {
        this._name = name;
    }
    name(name: string): ApplicationCommandOptionChoice {
        if (!/^[\w-]{1,32}$/g.test(name)) {
            throw new Error(`want: /^[\\w-]{1,32}$/, got: ${name}`);
        }
        this._name = name;
        return this;
    }
    value(value: string|number): ApplicationCommandOptionChoice {
        this._value = value;
        return this;
    }
    get command(): unknown {
        return {
            name: this._name,
            value: this._value,
        };
    }
}
