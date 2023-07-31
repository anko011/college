const concurrently = require('concurrently')


const {result, commands} = concurrently(
    [
        {
            command: 'next',
            name: 'NEXT SERVER',
            prefixColor: 'green'
        }
    ],
)



