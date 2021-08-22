"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PremiumTypes = exports.UserFlags = exports.InteractionType = exports.ApplicationCommandOptionType = void 0;
var ApplicationCommandOptionType;
(function (ApplicationCommandOptionType) {
    ApplicationCommandOptionType[ApplicationCommandOptionType["SUB_COMMAND"] = 1] = "SUB_COMMAND";
    ApplicationCommandOptionType[ApplicationCommandOptionType["SUB_COMMAND_GROUP"] = 2] = "SUB_COMMAND_GROUP";
    ApplicationCommandOptionType[ApplicationCommandOptionType["STRING"] = 3] = "STRING";
    ApplicationCommandOptionType[ApplicationCommandOptionType["INTEGER"] = 4] = "INTEGER";
    ApplicationCommandOptionType[ApplicationCommandOptionType["BOOLEAN"] = 5] = "BOOLEAN";
    ApplicationCommandOptionType[ApplicationCommandOptionType["USER"] = 6] = "USER";
    ApplicationCommandOptionType[ApplicationCommandOptionType["CHANNEL"] = 7] = "CHANNEL";
    ApplicationCommandOptionType[ApplicationCommandOptionType["ROLE"] = 8] = "ROLE";
})(ApplicationCommandOptionType = exports.ApplicationCommandOptionType || (exports.ApplicationCommandOptionType = {}));
var InteractionType;
(function (InteractionType) {
    InteractionType[InteractionType["Ping"] = 1] = "Ping";
    InteractionType[InteractionType["ApplicationCommand"] = 2] = "ApplicationCommand";
})(InteractionType = exports.InteractionType || (exports.InteractionType = {}));
var UserFlags;
(function (UserFlags) {
    UserFlags[UserFlags["None"] = 0] = "None";
    UserFlags[UserFlags["DiscordEmployee"] = 1] = "DiscordEmployee";
    UserFlags[UserFlags["PartneredServerOwner"] = 2] = "PartneredServerOwner";
    UserFlags[UserFlags["HypeSquadEvents"] = 4] = "HypeSquadEvents";
    UserFlags[UserFlags["BugHunterLevel1"] = 8] = "BugHunterLevel1";
    UserFlags[UserFlags["HouseBravery"] = 64] = "HouseBravery";
    UserFlags[UserFlags["HouseBalance"] = 256] = "HouseBalance";
    UserFlags[UserFlags["EarlySupporter"] = 512] = "EarlySupporter";
    UserFlags[UserFlags["TeamUser"] = 1024] = "TeamUser";
    UserFlags[UserFlags["BugHunterLevel2"] = 16384] = "BugHunterLevel2";
    UserFlags[UserFlags["VerifiedBot"] = 65536] = "VerifiedBot";
    UserFlags[UserFlags["EarlyVerifiedBotDeveloper"] = 131072] = "EarlyVerifiedBotDeveloper";
})(UserFlags = exports.UserFlags || (exports.UserFlags = {}));
var PremiumTypes;
(function (PremiumTypes) {
    PremiumTypes[PremiumTypes["None"] = 0] = "None";
    PremiumTypes[PremiumTypes["NitroClassic"] = 1] = "NitroClassic";
    PremiumTypes[PremiumTypes["Nitro"] = 2] = "Nitro";
})(PremiumTypes = exports.PremiumTypes || (exports.PremiumTypes = {}));
