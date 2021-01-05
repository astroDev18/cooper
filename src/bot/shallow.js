import { Client } from 'discord.js-commando';
import Database from './core/setup/database';
import STATE from './state';
import dotenv from 'dotenv';
import ItemsHelper from './community/features/items/itemsHelper';
import ServerHelper from './core/entities/server/serverHelper';
import Chicken from './community/chicken';
import StatisticsHelper from './community/features/server/statisticsHelper';

dotenv.config();

const shallowBot = async () => {

    STATE.CLIENT = new Client({ owner: '786671654721683517' });

    await Database.connect();
    await STATE.CLIENT.login(process.env.DISCORD_TOKEN);

    STATE.CLIENT.on('ready', async () => {
        console.log('Shallow bot is ready');

        // DEV WORK AND TESTING ON THE LINES BELOW.
        StatisticsHelper.addAboutStats();
        // DEV WORK AND TESTING ON THE LINES ABOVE.
    });

};

shallowBot();