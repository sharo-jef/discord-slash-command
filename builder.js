/* eslint-disable camelcase */

/**
 * @enum {number}
 */
export const ApplicationCommandOptionType = {
    SUB_COMMAND: 1,
    SUB_COMMAND_GROUP: 2,
    STRING: 3,
    INTEGER: 4,
    BOOLEAN: 5,
    USER: 6,
    CHANNEL: 7,
    ROLE: 8,
};

/**
 * builder for discord slash command
 * @param {string} name name
 * @returns {CommandBuilder}
 */
export function builder(name) {
    const builder = new CommandBuilder(name);
    return builder;
}

export class CommandBuilder {
    /**
     * @type {ApplicationCommand}
     */
    #command = null;
    /**
     * @param {string} name command name
     */
    constructor(name) {
        this.#command = new ApplicationCommand(name);
    }
    /**
     * @param {string} name command name
     * @return {CommandBuilder}
     */
    name(name) {
        this.#command.name(name);
        return this;
    }
    /**
     * @param {string} description command description
     * @return {CommandBuilder}
     */
    description(description) {
        this.#command.description(description);
        return this;
    }
    /**
     * @param {(options: ApplicationCommandOptions)=>ApplicationCommandOptions} options command options
     * @return {CommandBuilder}
     */
    options(options) {
        this.#command.options(options);
        return this;
    }
    /**
     * @param {boolean} defaultPermission default permission
     * @return {CommandBuilder}
     */
    defaultPermission(defaultPermission) {
        this.#command.defaultPermission(defaultPermission);
        return this;
    }
    /**
     * @return {unknown}
     */
    get command() {
        return this.#command.command;
    }
}

export class ApplicationCommand {
    /** @type {string} */
    #name = '';
    /** @type {string} */
    #description = '';
    /** @type {ApplicationCommandOptions} */
    #options = null;
    /** @type {boolean} */
    #defaultPermission = true;
    /**
     * @param {string} name command name
     */
    constructor(name) {
        this.name(name);
        this.#description = '';
        this.#options = null;
        this.#defaultPermission = true;
    }
    /**
     * @param {string} name command name
     * @return {ApplicationCommand}
     */
    name(name) {
        if (typeof name !== 'string') {
            throw new TypeError(`want: string, got: ${typeof name}`);
        }
        if (!/^[\w-]{1,32}$/g.test(name)) {
            throw new Error(`want: /^[\\w-]{1,32}$/, got: ${name}`);
        }
        this.#name = name;
        return this;
    }
    /**
     * @param {string} description command description
     * @return {ApplicationCommand}
     */
    description(description) {
        this.#description = description;
        return this;
    }
    /**
     * @param {(options:ApplicationCommandOptions) => ApplicationCommandOptions} options command options
     * @return {ApplicationCommand}
     */
    options(options) {
        this.#options = options(new ApplicationCommandOptions());
        return this;
    }
    /**
     * @param {boolean} defaultPermission default permission
     * @return {ApplicationCommand}
     */
    defaultPermission(defaultPermission) {
        this.#defaultPermission = defaultPermission;
        return this;
    }
    /**
     * @return {unknown}
     */
    get command() {
        if (!this.#name) {
            throw new Error('name is required');
        }
        if (!this.#description) {
            throw new Error('description is required');
        }

        const ret = {};
        ret.name = this.#name;
        ret.description = this.#description;
        if (this.#options) {
            ret.options = this.#options.command;
        }
        if (this.#defaultPermission) {
            ret.default_permission = this.#defaultPermission;
        }
        return ret;
    }
}

export class ApplicationCommandOptions {
    /** @type {ApplicationCommandOption[]} */
    #options = [];
    /**
     * @param {(option:ApplicationCommandOption) => ApplicationCommandOption} option option
     * @return {ApplicationCommandOptions}
     */
    option(option) {
        this.#options.push(option(new ApplicationCommandOption()));
        return this;
    }
    /**
     * @return {unknown[]}
     */
    get command() {
        return this.#options.map(o => o.command);
    }
}

export class ApplicationCommandOption {
    /** @type {string} */
    #name;
    /** @type {ApplicationCommandOptionType} */
    #type;
    /** @type {string} */
    #description;
    /** @type {boolean} */
    #required = false;
    /** @type {ApplicationCommandOptionChoices} */
    #choices;
    /** @type {ApplicationCommandOption} */
    #options;
    /**
     * @param {string} name option name
     */
    constructor(name) {
        if (name) {
            this.name(name);
        }
    }
    /**
     * @param {ApplicationCommandOptionType} type option type
     * @return {ApplicationCommandOption}
     */
    type(type) {
        this.#type = type;
        return this;
    }
    name(name) {
        if (typeof name !== 'string') {
            throw new TypeError(`want: string, got: ${typeof name}`);
        }
        if (!/^[\w-]{1,32}$/g.test(name)) {
            throw new Error(`want: /^[\\w-]{1,32}$/, got: ${name}`);
        }
        this.#name = name;
        return this;
    }
    /**
     * @param {string} description description
     * @return {ApplicationCommandOption}
     */
    description(description) {
        this.#description = description;
        return this;
    }
    /**
     * @param {boolean} required required
     * @return {ApplicationCommandOption}
     */
    required(required) {
        this.#required = required;
        return this;
    }
    /**
     * @param {(options: ApplicationCommandOptionChoices)=>ApplicationCommandOptionChoices} choices choices
     * @return {ApplicationCommandOption}
     */
    choices(choices) {
        this.#choices = choices(new ApplicationCommandOptionChoices());
        return this;
    }
    /**
     * @param {(options: ApplicationCommandOptions)=>ApplicationCommandOptions} options command options
     * @return {ApplicationCommandOption}
     */
    options(options) {
        this.#options = options(new ApplicationCommandOptions());
        return this;
    }
    /**
     * @return {unknown}
     */
    get command() {
        if (!this.#type) {
            throw new Error('type is required');
        }
        if (!this.#name) {
            throw new Error('name is required');
        }
        if (!this.#description) {
            throw new Error('description is required');
        }

        const ret = {};
        ret.type = this.#type;
        ret.name = this.#name;
        ret.description = this.#description;
        if (this.#required) {
            ret.required = this.#required;
        }
        if (this.#choices) {
            ret.choices = this.#choices.command;
        }
        if (this.#options) {
            ret.options = this.#options.command;
        }
        return ret;
    }
}

export class ApplicationCommandOptionChoices {
    /** @type {ApplicationCommandOptionChoice[]} */
    #choices = [];
    /**
     * @param {(choice:ApplicationCommandOptionChoice) => ApplicationCommandOptionChoice} choice choice
     * @return {ApplicationCommandOptionChoices}
     */
    choice(choice) {
        this.#choices.push(choice(new ApplicationCommandOptionChoice()));
        return this;
    }
    /**
     * @return {unknown[]}
     */
    get command() {
        return this.#choices.map(c => c.command);
    }
}

export class ApplicationCommandOptionChoice {
    /** @type {string} */
    #name;
    /** @type {string|number} */
    #value;
    constructor(name) {
        this.#name = name;
    }
    /**
     * @param {string} name choice name
     * @return {ApplicationCommandOptionChoice}
     */
    name(name) {
        if (typeof name !== 'string') {
            throw new TypeError(`want: string, got: ${typeof name}`);
        }
        if (!/^[\w-]{1,32}$/g.test(name)) {
            throw new Error(`want: /^[\\w-]{1,32}$/, got: ${name}`);
        }
        this.#name = name;
        return this;
    }
    /**
     * @param {string} value value
     * @return {ApplicationCommandOptionChoice}
     */
    value(value) {
        this.#value = value;
        return this;
    }
    /**
     * @return {unknown}
     */
    get command() {
        if (!this.#name) {
            throw new Error('name is required');
        }
        if (!this.#value) {
            throw new Error('value is required');
        }
        return {
            name: this.#name,
            value: this.#value,
        };
    }
}
