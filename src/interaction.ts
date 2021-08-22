import { default as axios } from 'axios';
import { StringResolvable } from 'discord.js';

import { ApplicationCommandOptionType, InteractionType, PremiumTypes, UserFlags } from './enums';

export type Snowflake = string;


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
    /* eslint-disable camelcase */
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

export class InteractionFactory {
    private token: string;
    constructor(token: string) {
        this.token = token;
    }
    create(interaction: InteractionObject): Interaction {
        return new Interaction(interaction, this.token);
    }
}

export class Interaction {
    interaction: InteractionObject;
    private _token: string;
    constructor(interaction: InteractionObject, token: string) {
        this.interaction = interaction;
        this._token = token;
    }
    get id(): Snowflake {
        return this.interaction.id;
    }
    get applicationId(): Snowflake {
        return this.interaction.application_id;
    }
    get type(): InteractionType {
        return this.interaction.type;
    }
    get data(): ApplicationCommandInteractionData {
        return this.interaction.data;
    }
    get guildId(): Snowflake {
        return this.interaction.guild_id;
    }
    get channelId(): Snowflake {
        return this.interaction.channel_id;
    }
    get member(): GuildMember {
        return this.interaction.member;
    }
    get user(): User {
        return this.interaction.user;
    }
    get token(): string {
        return this.interaction.token;
    }
    get version(): number {
        return this.interaction.version;
    }
    get toSimple(): unknown {
        function parse(option: ApplicationCommandIntegrationDataOption): unknown {
            const ret = {};
            switch (option.type) {
            case ApplicationCommandOptionType.SUB_COMMAND:
            case ApplicationCommandOptionType.SUB_COMMAND_GROUP:
                for (const o of option?.options?.map(o => parse(o)) as {name: string, value: string|number|boolean}[] || []) {
                    ret[o.name] = o.value;
                }
                return ret || { name: option.name };
            default:
                return { name: option.name, value: option?.value };
            }
        }
        return this.interaction.data.options?.map(o => parse(o));
    }
    async reply(content: StringResolvable, options: InteractionReplyOptions): Promise<void> {
        const contentString = `${
            options.mention
                ? `<@${this.interaction?.member?.user?.id || this.interaction?.user?.id || 0}>, `
                : ''
        }${content}`;
        axios
            .post(
                `https://discord.com/api/v8/interactions/${this.interaction.id}/${this.interaction.token}/callback`,
                { type: 4, data: { content: contentString } },
                { headers: { Authorization: `Bot ${this._token}` } },
            );
    }
}
