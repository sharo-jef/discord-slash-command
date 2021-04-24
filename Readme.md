# Discord Slash Command

## Install
```bash
npm i discord-slash-command
```

## Usage
```javascript
import { builder } from 'discord-slash-command';
const command = builder('cmd')
    .defaultPermission(true)
    .description('foo')
    .options(options => {
        return options
            .option(option => {
                return option
                    .type(ApplicationCommandOptionType.SUB_COMMAND)
                    .name('foo')
                    .description('bar')
                    .choices(choices => {
                        return choices
                            .choice(choice => {
                                return choice
                                    .name('choice1')
                                    .value('choice1');
                            });
                    });
            });
    })
    .command;
/*
 * output
 *
 * {
 *     "name": "cmd",
 *     "description": "foo",
 *     "options": [
 *         {
 *             "type": 1,
 *             "name": "foo",
 *             "description": "bar",
 *             "choices": [
 *                 {
 *                     "name": "choice1",
 *                     "value": "choice1"
 *                 }
 *             ]
 *         }
 *     ],
 *     "default_permission": true
 * }
 */
```
