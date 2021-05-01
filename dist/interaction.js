"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interaction = exports.InteractionFactory = void 0;
const axios_1 = __importDefault(require("axios"));
class InteractionFactory {
    constructor(token) {
        this.token = token;
    }
    create(interaction) {
        return new Interaction(interaction, this.token);
    }
}
exports.InteractionFactory = InteractionFactory;
class Interaction {
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
        axios_1.default
            .post(`https://discord.com/api/v8/interactions/${this.interaction.id}/${this.interaction.token}/callback`, { type: 4, data: { content: contentString } }, { headers: { Authorization: `Bot ${this._token}` } });
    }
}
exports.Interaction = Interaction;
