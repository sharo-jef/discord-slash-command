export class Interaction {
    constructor(interaction) {
        this.interaction = interaction;
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
    }
}
