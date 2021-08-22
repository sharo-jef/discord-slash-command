import { StringResolvable } from 'discord.js';
import { InteractionType, PremiumTypes, UserFlags } from './enums';
export declare type Snowflake = string;
export declare type ApplicationCommandInteractionData = {
    id: Snowflake;
    name: string;
    resolved?: ApplicationCommandInteractionDataResolved;
    options?: ApplicationCommandIntegrationDataOption[];
};
export declare type ApplicationCommandInteractionDataResolved = {
    users: unknown[];
    members: unknown[];
    roles: unknown[];
    channels: unknown[];
};
export declare type ApplicationCommandIntegrationDataOption = {
    name: string;
    type: number;
    value?: unknown;
    options?: ApplicationCommandIntegrationDataOption[];
};
export declare type GuildMember = {
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
export declare type User = {
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
export declare type InteractionObject = {
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
export declare type InteractionReplyOptions = {
    mention: boolean;
};
export declare class InteractionFactory {
    private token;
    constructor(token: string);
    create(interaction: InteractionObject): Interaction;
}
export declare class Interaction {
    interaction: InteractionObject;
    private _token;
    constructor(interaction: InteractionObject, token: string);
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
    get toSimple(): unknown;
    reply(content: StringResolvable, options: InteractionReplyOptions): Promise<void>;
}
