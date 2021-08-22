import { ApplicationCommandOptionType } from './enums';

export function builder(name: string, description?: string): CommandBuilder {
    const builder = new CommandBuilder(name, description);
    return builder;
}

export class CommandBuilder {
    private _command: ApplicationCommand;
    constructor(name: string, description?: string) {
        this._command = new ApplicationCommand(name, description);
    }
    name(name: string): CommandBuilder {
        this._command.name(name);
        return this;
    }
    description(description: string): CommandBuilder {
        this._command.description(description);
        return this;
    }
    option(option: (option: ApplicationCommandOption) => ApplicationCommandOption): CommandBuilder {
        this._command.option(option);
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
    private _options: ApplicationCommandOption[] = [];
    private _defaultPermission = true;
    constructor(name: string, description?: string) {
        this.name(name);
        this._description = description ?? '';
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
    option(option: (option: ApplicationCommandOption) => ApplicationCommandOption): ApplicationCommand {
        this._options.push(option(new ApplicationCommandOption()));
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
            /* eslint-disable-next-line camelcase */
            default_permission: boolean,
        };
        ret.name = this._name;
        ret.description = this._description;
        if (this._options?.length) {
            ret.options = this._options.map(o => o.command);
        }
        if (this._defaultPermission) {
            /* eslint-disable-next-line camelcase */
            ret.default_permission = this._defaultPermission;
        }
        return ret;
    }
}

export class ApplicationCommandOption {
    private _name: string;
    private _type: ApplicationCommandOptionType;
    private _description: string;
    private _required = false;
    private _choices: ApplicationCommandOptionChoice[] = [];
    private _options: ApplicationCommandOption[] = [];
    constructor(name = '') {
        if (name) {
            this.name(name);
        }
    }
    name(name: string): ApplicationCommandOption {
        if (!/^[\w-]{1,32}$/g.test(name)) {
            throw new Error(`want: /^[\\w-]{1,32}$/, got: ${name}`);
        }
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
    choice(choice: (choice: ApplicationCommandOptionChoice) => ApplicationCommandOptionChoice): ApplicationCommandOption {
        this._choices.push(choice(new ApplicationCommandOptionChoice()));
        return this;
    }
    option(option: (option: ApplicationCommandOption) => ApplicationCommandOption): ApplicationCommandOption {
        this._options.push(option(new ApplicationCommandOption()));
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
        if (this._choices?.length) {
            ret.choices = this._choices.map(c => c.command);
        }
        if (this._options?.length) {
            ret.options = this._options.map(o => o.command);
        }
        return ret;
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
