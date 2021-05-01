import { StringResolvable } from 'discord.js';
import { ApplicationCommandInteractionData, GuildMember, InteractionObject, InteractionReplyOptions, InteractionType, Snowflake, User } from './@types/index';

export class Interaction {
    interaction: InteractionObject;
    constructor(interaction: InteractionObject) {
        this.interaction = interaction;
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
    async reply(content: StringResolvable, options: InteractionReplyOptions): Promise<void> {
        const contentString = `${
            options.mention
                ? `<@${this.interaction?.member?.user?.id || this.interaction?.user?.id || 0}>, `
                : ''
        }${content}`;
    }
}
