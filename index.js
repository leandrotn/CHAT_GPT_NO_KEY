const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client({
    intents: [32767]
});
const apiUrl = 'https://chatgpt.apinepdev.workers.dev/?question=';
console.log('estou online!!')

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.mentions.has(client.user)) return;
    const question = message.content.replace(/<@!\d+>/, '').trim();

    try {
        const response = await axios.get(apiUrl + encodeURIComponent(question));
        if (response.data.answer === undefined) {
            message.reply('Infelizmente eu não consigo te responder essa, sou inteligente mas nem tanto quanto o leandrotn -_-');
        } else {
            message.reply(`${message.author}, ${response.data.answer}`);
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição à API:', error);
        message.reply('Desculpe, ocorreu um erro ao processar sua pergunta.');
    }
});

client.login('TOKEN_AQUI');
