/**
 * @typedef {string} Snowflake
 *
 * @typedef {number} InteractionType
 *
 * @typedef {object} InteractionObject
 * @property {string} id
 * @property {SnowFlake} application_id
 * @property {InteractionType} type
 * @property {ApplicationCommandInteractionData} data
 * @property {SnowFlake} guild_id
 * @property {SnowFlake} channel_id
 * @property {GuildMember?} member
 * @property {User} user
 * @property {string} token
 * @property {number} version
 */
export class Interaction {
    /**
     * @param {InteractionObject} interaction interaction object
     */
    constructor(interaction: InteractionObject);
}
export type Snowflake = string;
export type InteractionType = number;
export type InteractionObject = {
    id: string;
    application_id: any;
    type: InteractionType;
    data: any;
    guild_id: any;
    channel_id: any;
    member: any;
    user: any;
    token: string;
    version: number;
};
