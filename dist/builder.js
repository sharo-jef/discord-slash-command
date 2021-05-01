"use strict";
/* eslint-disable camelcase */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationCommandOptionChoice = exports.ApplicationCommandOptionChoices = exports.ApplicationCommandOption = exports.ApplicationCommandOptions = exports.ApplicationCommand = exports.CommandBuilder = exports.builder = exports.ApplicationCommandOptionType = void 0;
var ApplicationCommandOptionType;
(function (ApplicationCommandOptionType) {
    ApplicationCommandOptionType[ApplicationCommandOptionType["SUB_COMMAND"] = 1] = "SUB_COMMAND";
    ApplicationCommandOptionType[ApplicationCommandOptionType["SUB_COMMAND_GROUP"] = 2] = "SUB_COMMAND_GROUP";
    ApplicationCommandOptionType[ApplicationCommandOptionType["STRING"] = 3] = "STRING";
    ApplicationCommandOptionType[ApplicationCommandOptionType["INTEGER"] = 4] = "INTEGER";
    ApplicationCommandOptionType[ApplicationCommandOptionType["BOOLEAN"] = 5] = "BOOLEAN";
    ApplicationCommandOptionType[ApplicationCommandOptionType["USER"] = 6] = "USER";
    ApplicationCommandOptionType[ApplicationCommandOptionType["CHANNEL"] = 7] = "CHANNEL";
    ApplicationCommandOptionType[ApplicationCommandOptionType["ROLE"] = 8] = "ROLE";
})(ApplicationCommandOptionType = exports.ApplicationCommandOptionType || (exports.ApplicationCommandOptionType = {}));
function builder(name) {
    const builder = new CommandBuilder(name);
    return builder;
}
exports.builder = builder;
class CommandBuilder {
    constructor(name) {
        this._command = new ApplicationCommand(name);
    }
    name(name) {
        this._command.name(name);
        return this;
    }
    description(description) {
        this._command.description(description);
        return this;
    }
    options(options) {
        this._command.options(options);
        return this;
    }
    defaultPermission(defaultPermission) {
        this._command.defaultPermission(defaultPermission);
        return this;
    }
    get command() {
        return this._command.command;
    }
}
exports.CommandBuilder = CommandBuilder;
class ApplicationCommand {
    constructor(name) {
        this._name = '';
        this._description = '';
        this._defaultPermission = true;
        this.name(name);
        this._description = '';
    }
    name(name) {
        if (!/^[\w-]{1,32}$/g.test(name)) {
            throw new Error(`want: /^[\\w-]{1,32}$/, got: ${name}`);
        }
        this._name = name;
        return this;
    }
    description(description) {
        this._description = description;
        return this;
    }
    options(options) {
        this._options = options(new ApplicationCommandOptions());
        return this;
    }
    defaultPermission(defaultPermission) {
        this._defaultPermission = defaultPermission;
        return this;
    }
    get command() {
        if (!this._name) {
            throw new Error('name is required');
        }
        if (!this._description) {
            throw new Error('description is required');
        }
        const ret = {};
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
exports.ApplicationCommand = ApplicationCommand;
class ApplicationCommandOptions {
    constructor() {
        this._options = [];
    }
    option(option) {
        this._options.push(option(new ApplicationCommandOption()));
        return this;
    }
    get command() {
        return this._options.map(o => o.command);
    }
}
exports.ApplicationCommandOptions = ApplicationCommandOptions;
class ApplicationCommandOption {
    constructor(name = '') {
        this._required = false;
        if (name) {
            this.name(name);
        }
    }
    name(name) {
        if (!/^[\w-]{1,32}$/g.test(name)) {
            throw new Error(`want: /^[\\w-]{1,32}$/, got: ${name}`);
        }
        this._name = name;
        return this;
    }
    type(type) {
        this._type = type;
        return this;
    }
    description(description) {
        this._description = description;
        return this;
    }
    required(required) {
        this._required = required;
        return this;
    }
    choices(choices) {
        this._choices = choices(new ApplicationCommandOptionChoices());
        return this;
    }
    options(options) {
        this._options = options(new ApplicationCommandOptions());
        return this;
    }
    get command() {
        if (!this._type) {
            throw new Error('type is required');
        }
        if (!this._name) {
            throw new Error('name is required');
        }
        if (!this._description) {
            throw new Error('description is required');
        }
        const ret = {};
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
exports.ApplicationCommandOption = ApplicationCommandOption;
class ApplicationCommandOptionChoices {
    constructor() {
        this._choices = [];
    }
    choice(choice) {
        this._choices.push(choice(new ApplicationCommandOptionChoice()));
        return this;
    }
    get command() {
        return this._choices.map(c => c.command);
    }
}
exports.ApplicationCommandOptionChoices = ApplicationCommandOptionChoices;
class ApplicationCommandOptionChoice {
    constructor(name = '') {
        this._name = name;
    }
    name(name) {
        if (!/^[\w-]{1,32}$/g.test(name)) {
            throw new Error(`want: /^[\\w-]{1,32}$/, got: ${name}`);
        }
        this._name = name;
        return this;
    }
    value(value) {
        this._value = value;
        return this;
    }
    get command() {
        return {
            name: this._name,
            value: this._value,
        };
    }
}
exports.ApplicationCommandOptionChoice = ApplicationCommandOptionChoice;
