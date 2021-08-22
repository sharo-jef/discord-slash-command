"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationCommandOptionChoice = exports.ApplicationCommandOption = exports.ApplicationCommand = exports.CommandBuilder = exports.builder = void 0;
function builder(name, description) {
    const builder = new CommandBuilder(name, description);
    return builder;
}
exports.builder = builder;
class CommandBuilder {
    constructor(name, description) {
        this._command = new ApplicationCommand(name, description);
    }
    name(name) {
        this._command.name(name);
        return this;
    }
    description(description) {
        this._command.description(description);
        return this;
    }
    option(option) {
        this._command.option(option);
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
    constructor(name, description) {
        this._name = '';
        this._description = '';
        this._options = [];
        this._defaultPermission = true;
        this.name(name);
        this._description = description ?? '';
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
    option(option) {
        this._options.push(option(new ApplicationCommandOption()));
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
        if (this._options?.length) {
            ret.options = this._options.map(o => o.command);
        }
        if (this._defaultPermission) {
            ret.default_permission = this._defaultPermission;
        }
        return ret;
    }
}
exports.ApplicationCommand = ApplicationCommand;
class ApplicationCommandOption {
    constructor(name = '') {
        this._required = false;
        this._choices = [];
        this._options = [];
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
    choice(choice) {
        this._choices.push(choice(new ApplicationCommandOptionChoice()));
        return this;
    }
    option(option) {
        this._options.push(option(new ApplicationCommandOption()));
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
        if (this._choices?.length) {
            ret.choices = this._choices.map(c => c.command);
        }
        if (this._options?.length) {
            ret.options = this._options.map(o => o.command);
        }
        return ret;
    }
}
exports.ApplicationCommandOption = ApplicationCommandOption;
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
