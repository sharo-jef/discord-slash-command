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
    var builder = new CommandBuilder(name);
    return builder;
}
exports.builder = builder;
var CommandBuilder = /** @class */ (function () {
    function CommandBuilder(name) {
        this._command = new ApplicationCommand(name);
    }
    CommandBuilder.prototype.name = function (name) {
        this._command.name(name);
        return this;
    };
    CommandBuilder.prototype.description = function (description) {
        this._command.description(description);
        return this;
    };
    CommandBuilder.prototype.options = function (options) {
        this._command.options(options);
        return this;
    };
    CommandBuilder.prototype.defaultPermission = function (defaultPermission) {
        this._command.defaultPermission(defaultPermission);
        return this;
    };
    Object.defineProperty(CommandBuilder.prototype, "command", {
        get: function () {
            return this._command.command;
        },
        enumerable: false,
        configurable: true
    });
    return CommandBuilder;
}());
exports.CommandBuilder = CommandBuilder;
var ApplicationCommand = /** @class */ (function () {
    function ApplicationCommand(name) {
        this._name = '';
        this._description = '';
        this._defaultPermission = true;
        this.name(name);
        this._description = '';
    }
    ApplicationCommand.prototype.name = function (name) {
        if (!/^[\w-]{1,32}$/g.test(name)) {
            throw new Error("want: /^[\\w-]{1,32}$/, got: " + name);
        }
        this._name = name;
        return this;
    };
    ApplicationCommand.prototype.description = function (description) {
        this._description = description;
        return this;
    };
    ApplicationCommand.prototype.options = function (options) {
        this._options = options(new ApplicationCommandOptions());
        return this;
    };
    ApplicationCommand.prototype.defaultPermission = function (defaultPermission) {
        this._defaultPermission = defaultPermission;
        return this;
    };
    Object.defineProperty(ApplicationCommand.prototype, "command", {
        get: function () {
            if (!this._name) {
                throw new Error('name is required');
            }
            if (!this._description) {
                throw new Error('description is required');
            }
            var ret = {};
            ret.name = this._name;
            ret.description = this._description;
            if (this._options) {
                ret.options = this._options.command;
            }
            if (this._defaultPermission) {
                ret.default_permission = this._defaultPermission;
            }
            return ret;
        },
        enumerable: false,
        configurable: true
    });
    return ApplicationCommand;
}());
exports.ApplicationCommand = ApplicationCommand;
var ApplicationCommandOptions = /** @class */ (function () {
    function ApplicationCommandOptions() {
        this._options = [];
    }
    ApplicationCommandOptions.prototype.option = function (option) {
        this._options.push(option(new ApplicationCommandOption()));
        return this;
    };
    Object.defineProperty(ApplicationCommandOptions.prototype, "command", {
        get: function () {
            return this._options.map(function (o) { return o.command; });
        },
        enumerable: false,
        configurable: true
    });
    return ApplicationCommandOptions;
}());
exports.ApplicationCommandOptions = ApplicationCommandOptions;
var ApplicationCommandOption = /** @class */ (function () {
    function ApplicationCommandOption(name) {
        if (name === void 0) { name = ''; }
        this._required = false;
        if (name) {
            this.name(name);
        }
    }
    ApplicationCommandOption.prototype.name = function (name) {
        if (!/^[\w-]{1,32}$/g.test(name)) {
            throw new Error("want: /^[\\w-]{1,32}$/, got: " + name);
        }
        this._name = name;
        return this;
    };
    ApplicationCommandOption.prototype.type = function (type) {
        this._type = type;
        return this;
    };
    ApplicationCommandOption.prototype.description = function (description) {
        this._description = description;
        return this;
    };
    ApplicationCommandOption.prototype.required = function (required) {
        this._required = required;
        return this;
    };
    ApplicationCommandOption.prototype.choices = function (choices) {
        this._choices = choices(new ApplicationCommandOptionChoices());
        return this;
    };
    ApplicationCommandOption.prototype.options = function (options) {
        this._options = options(new ApplicationCommandOptions());
        return this;
    };
    Object.defineProperty(ApplicationCommandOption.prototype, "command", {
        get: function () {
            if (!this._type) {
                throw new Error('type is required');
            }
            if (!this._name) {
                throw new Error('name is required');
            }
            if (!this._description) {
                throw new Error('description is required');
            }
            var ret = {};
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
        },
        enumerable: false,
        configurable: true
    });
    return ApplicationCommandOption;
}());
exports.ApplicationCommandOption = ApplicationCommandOption;
var ApplicationCommandOptionChoices = /** @class */ (function () {
    function ApplicationCommandOptionChoices() {
        this._choices = [];
    }
    ApplicationCommandOptionChoices.prototype.choice = function (choice) {
        this._choices.push(choice(new ApplicationCommandOptionChoice()));
        return this;
    };
    Object.defineProperty(ApplicationCommandOptionChoices.prototype, "command", {
        get: function () {
            return this._choices.map(function (c) { return c.command; });
        },
        enumerable: false,
        configurable: true
    });
    return ApplicationCommandOptionChoices;
}());
exports.ApplicationCommandOptionChoices = ApplicationCommandOptionChoices;
var ApplicationCommandOptionChoice = /** @class */ (function () {
    function ApplicationCommandOptionChoice(name) {
        if (name === void 0) { name = ''; }
        this._name = name;
    }
    ApplicationCommandOptionChoice.prototype.name = function (name) {
        if (!/^[\w-]{1,32}$/g.test(name)) {
            throw new Error("want: /^[\\w-]{1,32}$/, got: " + name);
        }
        this._name = name;
        return this;
    };
    ApplicationCommandOptionChoice.prototype.value = function (value) {
        this._value = value;
        return this;
    };
    Object.defineProperty(ApplicationCommandOptionChoice.prototype, "command", {
        get: function () {
            return {
                name: this._name,
                value: this._value,
            };
        },
        enumerable: false,
        configurable: true
    });
    return ApplicationCommandOptionChoice;
}());
exports.ApplicationCommandOptionChoice = ApplicationCommandOptionChoice;
