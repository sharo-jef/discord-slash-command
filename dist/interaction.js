import { default as axios } from 'axios';
export class InteractionFactory {
    constructor(token) {
        this.token = token;
    }
    create(interaction) {
        return new Interaction(interaction, this.token);
    }
}
export class Interaction {
    constructor(interaction, token) {
        this.interaction = interaction;
        this._token = token;
    }
    get id() {
        return this.interaction.id;
    }
    get applicationId() {
        return this.interaction.application_id;
    }
    get type() {
        return this.interaction.type;
    }
    get data() {
        return this.interaction.data;
    }
    get guildId() {
        return this.interaction.guild_id;
    }
    get channelId() {
        return this.interaction.channel_id;
    }
    get member() {
        return this.interaction.member;
    }
    get user() {
        return this.interaction.user;
    }
    get token() {
        return this.interaction.token;
    }
    get version() {
        return this.interaction.version;
    }
    async reply(content, options) {
        const contentString = `${options.mention
            ? `<@${this.interaction?.member?.user?.id || this.interaction?.user?.id || 0}>, `
            : ''}${content}`;
        axios
            .post(`https://discord.com/api/v8/interactions/${this.interaction.id}/${this.interaction.token}/callback`, { type: 4, data: { content: contentString } }, { headers: { Authorization: `Bot ${this._token}` } });
    }
}
