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
    .description('bar')
    .name('bry')
    .options(options => {
        return options
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
    })
    .command;
/*
 * output
 *
 *   {
 *       "name": "bry",
 *       "description": "bar",
 *       "options": {
 *           "type": 1,
 *           "name": "foo",
 *           "description": "bar",
 *           "choices": [
 *               {
 *                   "name": "choice1",
 *                   "value": "choice1"
 *               }
 *           ]
 *       },
 *       "default_permission": true
 *   }
```
