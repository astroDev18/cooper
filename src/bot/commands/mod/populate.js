import CoopCommand from '../../core/entities/coopCommand';
import Database from '../../core/setup/database';

import _ from 'lodash';

import STATE from '../../state';


export default class PopulateCommand extends CoopCommand {

	constructor(client) {
		super(client, {
			name: 'populate',
			group: 'mod',
			memberName: 'populate',
			aliases: [],
			description: 'Populate Database',
			details: `Details`,
			examples: ['populate', 'nuke example?'],

			// Stop us getting nuked
			ownerOnly: true,
		});
	}

	async run(msg) {
		super.run(msg);

		try {
			const usersResponse = await Database.query('SELECT * FROM users');
			const includedIDs = _.map(usersResponse.rows, "discord_id");

			const membersData = msg.guild.members.cache.map(member => {
				return {
					discord_id: member.user.id,
					join_date: member.joinedTimestamp,
					points: 0
				};
			});

			const missingItems = membersData.filter(member => {
				return includedIDs.indexOf(member.discord_id) === -1;
			});

			missingItems.forEach(async (item) => {
				await Database.query(
					`INSERT INTO users(discord_id,join_date,points) VALUES 
					(${item.discord_id},${item.join_date},${item.points})`
				);
			})

		} catch(e) {
			console.error(e);
		}

    }
    
};