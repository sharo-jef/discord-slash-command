export class Interaction {
    /**
     * @param {InteractionObject} interaction interaction object
     */
    constructor(interaction) {
        this.interaction = interaction;
    }
    get id() {
        return this.interaction.id;
    }
}
