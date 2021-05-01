/* eslint-disable camelcase */

import { StringResolvable } from 'discord.js';

export type Snowflake = string;
export class InteractionFactory {
    private token: string;
    constructor(token: string);
    create(interaction: InteractionObject): Interaction;
}
export class Interaction {
    interaction: InteractionObject;
    private _token: string;
    /**
     * @param {InteractionObject} interaction interaction object
     */
    constructor(interaction: InteractionObject);
    get id(): Snowflake;
    get applicationId(): Snowflake;
    get type(): InteractionType;
    get data(): ApplicationCommandInteractionData;
    get guildId(): Snowflake;
    get channelId(): Snowflake;
    get member(): GuildMember;
    get user(): User;
    get token(): string;
    get version(): number;
    reply(content: StringResolvable, options: InteractionReplyOptions): Promise<void>;
}
export enum ApplicationCommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
}
export enum InteractionType {
    Ping = 1,
    ApplicationCommand = 2,
}
export type ApplicationCommandInteractionData = {
    id: Snowflake;
    name: string;
    resolved?: ApplicationCommandInteractionDataResolved;
    options?: ApplicationCommandIntegrationDataOption[];
};
export type ApplicationCommandInteractionDataResolved = {
    users: unknown[];
    members: unknown[];
    roles: unknown[];
    channels: unknown[];
};
export type ApplicationCommandIntegrationDataOption = {
    name: string;
    type: number;
    value?: unknown;  // OptionType;
    options?: ApplicationCommandIntegrationDataOption[];
};
export type GuildMember = {
    user?: User;
    nick?: string;
    roles: Snowflake[];
    /**
     * ISO8601 timestamp
     */
    joined_at: string;
    /**
     * ISO8601 timestamp
     */
    premium_since?: string;
    deaf: boolean;
    mute: boolean;
    pending?: boolean;
    permissions?: string;
};
export enum UserFlags {
    None = 0,
    DiscordEmployee = 1 << 0,
    PartneredServerOwner = 1 << 1,
    HypeSquadEvents = 1 << 2,
    BugHunterLevel1 = 1 << 3,
    HouseBravery = 1 << 6,
    HouseBalance = 1 << 8,
    EarlySupporter = 1 << 9,
    TeamUser = 1 << 10,
    BugHunterLevel2 = 1 << 14,
    VerifiedBot = 1 << 16,
    EarlyVerifiedBotDeveloper = 1 << 17,
}
export enum PremiumTypes {
    None = 0,
    NitroClassic = 1,
    Nitro = 2,
}
export type User = {
    id: Snowflake;
    username: string;
    discriminator: string;
    avatar?: string;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    locale?: string;
    verified?: boolean;
    email?: string;
    flags?: UserFlags;
    premium_type?: PremiumTypes;
    public_flags?: UserFlags;
};
export type InteractionObject = {
    id: Snowflake;
    application_id: Snowflake;
    type: InteractionType;
    data: ApplicationCommandInteractionData;
    guild_id: Snowflake;
    channel_id: Snowflake;
    member: GuildMember;
    user: User;
    token: string;
    version: number;
};
export type InteractionReplyOptions = {
    mention: boolean;
};

export function builder(name: string): CommandBuilder;

export class CommandBuilder {
    private _command: ApplicationCommand;
    name(name: string): CommandBuilder;
    description(description: string): CommandBuilder;
    options(options: (options: ApplicationCommandOptions) => ApplicationCommandOptions): CommandBuilder;
    defaultPermission(defaultPermission: boolean): CommandBuilder;
    get command(): unknown;
}

export class ApplicationCommand {
    private _name;
    private _description;
    private _options: ApplicationCommandOptions;
    private _defaultPermission;
    name(name: string): ApplicationCommand;
    description(description: string): ApplicationCommand;
    options(options: (options: ApplicationCommandOptions) => ApplicationCommandOptions): ApplicationCommand;
    defaultPermission(defaultPermission: boolean): ApplicationCommand;
    get command(): unknown;
}

export class ApplicationCommandOptions {
    _options: ApplicationCommandOption[];
    option(option: (option: ApplicationCommandOption) => ApplicationCommandOption): ApplicationCommandOptions;
    get command(): unknown[];
}

export class ApplicationCommandOption {
    private _name: string;
    private _type: ApplicationCommandOptionType;
    private _description: string;
    private _required;
    private _choices: ApplicationCommandOptionChoices;
    private _options: ApplicationCommandOptions;
    name(name: string): ApplicationCommandOption;
    type(type: ApplicationCommandOptionType): ApplicationCommandOption;
    description(description: string): ApplicationCommandOption;
    required(required: boolean): ApplicationCommandOption;
    choices(choices: (choices: ApplicationCommandOptionChoices) => ApplicationCommandOptionChoices): ApplicationCommandOption;
    options(options: (options: ApplicationCommandOptions) => ApplicationCommandOptions): ApplicationCommandOption;
    get command(): unknown;
}

export class ApplicationCommandOptionChoices {
    private _choices: ApplicationCommandOptionChoice[];
    choice(choice: (choice: ApplicationCommandOptionChoice) => ApplicationCommandOptionChoice): ApplicationCommandOptionChoices;
    get command(): unknown[];
}

export class ApplicationCommandOptionChoice {
    private _name: string;
    private _value: string|number;
    name(name: string): ApplicationCommandOptionChoice;
    value(value: string|number): ApplicationCommandOptionChoice;
    get command(): unknown;
}
