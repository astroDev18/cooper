import MessagesHelper from "../../../core/entities/messages/messagesHelper";
import UsersHelper from "../../../core/entities/users/usersHelper";
import STATE from "../../../state";

export default class LinkPreviewFilter {

        static isLink(str) {
            const urlRegexExp = '(?:(?:http|https)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?';
            const regex = new RegExp(urlRegexExp, 'i');
            return regex.test(str);
        }

        static async onMessage(msg) {
            if (UsersHelper.isCooperMsg(msg)) return false;
            if (msg.command !== null) return false;

            // Check if message contains link.
            if (this.isLink(msg.content)) {
                MessagesHelper.delayReact(msg, '🖼️', 666);
                msg.suppressEmbeds(true);
            }
        }

        // Check if portrait emoji, toggle suppression.
        static onReaction(reaction, user) {
            if (UsersHelper.isCooper(user.id)) return false;
            if (UsersHelper.isCooperMsg(reaction.message)) return false;

            // TODO: Test for embeds instead.
            const toggleVal = STATE.CHANCE.bool({ likelihood: 50 });

            if (reaction.emoji.name === '🖼️') setTimeout(() => {
                reaction.message.suppressEmbeds(toggleVal);
            }, 999);
        }

}