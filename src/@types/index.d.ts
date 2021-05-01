/* eslint-disable camelcase */
export type Snowflake = string;
export class Interaction {
    /**
     * @param {InteractionObject} interaction interaction object
     */
    constructor(interaction: InteractionObject);
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
