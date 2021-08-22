/* eslint-disable */
const { deepStrictEqual } = require('assert');
const { builder, ApplicationCommandOptionType } = require('../dist/index.js');

describe('Unit test', () => {
    it('1', () => {
        const generated = builder('cmd', 'desc').command;
        const expected = {
            default_permission: true,
            description: 'desc',
            name: 'cmd',
        };
        deepStrictEqual(generated, expected);
    });
    it('2', () => {
        const generated = builder('cmd', 'desc')
            .option(option => {
                return option
                    .type(ApplicationCommandOptionType.SUB_COMMAND)
                    .name('opt1')
                    .description('desc1')
                    .choice(choice => choice
                        .name('choice1')
                        .value('choice1')
                    );
            })
            .command;
        const expected = {
            default_permission: true,
            description: 'desc',
            name: 'cmd',
            options: [
                {
                    type: ApplicationCommandOptionType.SUB_COMMAND,
                    name: 'opt1',
                    description: 'desc1',
                    choices: [
                        {
                            name: 'choice1',
                            value: 'choice1',
                        },
                    ],
                },
            ],
        };
        deepStrictEqual(generated, expected);
    });
    it('3', () => {
        const generated = builder('cmd', 'desc')
            .option(option => {
                return option
                    .type(ApplicationCommandOptionType.SUB_COMMAND)
                    .name('opt1')
                    .description('desc1')
                    .choice(choice => choice
                        .name('choice1-1')
                        .value('choice1-1')
                    )
                    .choice(choice => choice
                        .name('choice1-2')
                        .value('choice1-2')
                    );
            })
            .option(option => {
                return option
                    .type(ApplicationCommandOptionType.SUB_COMMAND)
                    .name('opt2')
                    .description('desc2')
                    .choice(choice => choice
                        .name('choice2-1')
                        .value('choice2-1')
                    )
                    .choice(choice => choice
                        .name('choice2-2')
                        .value('choice2-2')
                    );
            })
            .command;
        const expected = {
            default_permission: true,
            description: 'desc',
            name: 'cmd',
            options: [
                {
                    type: ApplicationCommandOptionType.SUB_COMMAND,
                    name: 'opt1',
                    description: 'desc1',
                    choices: [
                        {
                            name: 'choice1-1',
                            value: 'choice1-1',
                        },
                        {
                            name: 'choice1-2',
                            value: 'choice1-2',
                        },
                    ],
                },
                {
                    type: ApplicationCommandOptionType.SUB_COMMAND,
                    name: 'opt2',
                    description: 'desc2',
                    choices: [
                        {
                            name: 'choice2-1',
                            value: 'choice2-1',
                        },
                        {
                            name: 'choice2-2',
                            value: 'choice2-2',
                        },
                    ],
                },
            ],
        };
        deepStrictEqual(generated, expected);
    });
    it('4', () => {
        const generated = builder('cmd', 'desc')
            .option(option => {
                return option
                    .type(ApplicationCommandOptionType.SUB_COMMAND_GROUP)
                    .name('cmd1')
                    .description('desc1')
                    .option(option => {
                        return option
                            .type(ApplicationCommandOptionType.SUB_COMMAND)
                            .name('cmd1-1')
                            .description('desc1-1')
                            .choice(choice => {
                                return choice
                                    .name('choice1-1')
                                    .value('choice1-1');
                            })
                            .choice(choice => {
                                return choice
                                    .name('choice1-2')
                                    .value('choice1-2');
                            })
                    })
                    .option(option => {
                        return option
                            .type(ApplicationCommandOptionType.SUB_COMMAND)
                            .name('cmd1-2')
                            .description('desc1-2')
                            .choice(choice => {
                                return choice
                                    .name('choice2-1')
                                    .value('choice2-1');
                            })
                            .choice(choice => {
                                return choice
                                    .name('choice2-2')
                                    .value('choice2-2');
                            });
                    });
            })
            .command;
        const expected = {
            default_permission: true,
            description: 'desc',
            name: 'cmd',
            options: [
                {
                    description: 'desc1',
                    name: 'cmd1',
                    options: [
                        {
                            choices: [
                                {
                                    name: 'choice1-1',
                                    value: 'choice1-1',
                                },
                                {
                                    name: 'choice1-2',
                                    value: 'choice1-2',
                                },
                            ],
                            description: 'desc1-1',
                            name: 'cmd1-1',
                            type: ApplicationCommandOptionType.SUB_COMMAND,
                        },
                        {
                            choices: [
                                {
                                    name: 'choice2-1',
                                    value: 'choice2-1',
                                },
                                {
                                    name: 'choice2-2',
                                    value: 'choice2-2',
                                },
                            ],
                            description: 'desc1-2',
                            name: 'cmd1-2',
                            type: ApplicationCommandOptionType.SUB_COMMAND,
                        },
                    ],
                    type: ApplicationCommandOptionType.SUB_COMMAND_GROUP,
                },
            ],
        };
        deepStrictEqual(generated, expected);
    });
});
