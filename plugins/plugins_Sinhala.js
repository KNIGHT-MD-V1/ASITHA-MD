
const config = require('../config')
const { cmd, commands } = require('../command')
const {readEnv} = require('../lib/database')
const axios = require('axios')
const os = require("os")
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, Func, fetchJson} = require('../lib/functions')

cmd({
    pattern: "sinhalasub",
    desc: "Check bot setting.",
    react: "🎬",
    category: "movie",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
   if (!q) return await reply("please provide name");
        }
let data2 = await fetchJson(`https://www.dark-yasiya-api.site/movie/sinhalasub/search?text=$`)
//let tut = Object.keys(data2.result.data).length

const config = await readEnv();
let  urll = await fetchJson(`https://www.dark-yasiya-api.site/movie/sinhalasub/movie?url=$`)
let cc = `
☘️ *𝗧ɪᴛʟᴇ : ${urll.result.data.title}*

▫️📅. *𝗥ᴇʟᴇᴀꜱᴇ 𝗗ᴀᴛᴇ - ${urll.result.data.date}*
▫️🌎. *𝗖ᴏᴜɴᴛʀʏ - ${urll.result.data.country}*
▫️⏱️. *𝗗ᴜʀᴀᴛɪᴏɴ - ${urll.result.data.runtime}*
▫️🎭. *𝗚ᴇɴʀᴇꜱ - ${urll.result.data.category[0]} ${urll.result.data.category[1]} ${urll.result.data.category[2]}*
▫️👨🏻‍💼. *𝗗ɪʀᴇᴄᴛᴏʀ - ${urll.result.data.director}*

▫️🕵️‍♂️. *𝗖ᴀsᴛ - ${urll.result.data.cast[0].cast_name} ${urll.result.data.cast[1].cast_name}*
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
▫️🔗. *Url* - ${q} 
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟➟*

> *POWERED by ASITHA-MD*
`
const quality = urll.result.data.dl_links[0].link 
  let pp = quality.replace("/u/", "/api/file/")
const quality1 = urll.result.data.dl_links[1].link
  let pp1 = quality1.replace("/u/", "/api/file/")
const quality2 = urll.result.data.dl_links[2].link
  let pp2 = quality2.replace("/u/", "/api/file/")
let abc = `
🔢 *Please reply the number you want to select*

  🎬 *1 | 480p :* ${pp2}
  🎬 *2 | 720p :* ${pp1}
  🎬 *3 | 1080p :* ${pp}

> *POWERED by ASITHA-MD*
`
await conn.sendMessage(from, { image: { url: urll.result.data.image}, caption: cc },{ quoted: mek });
const sentMsg = await conn.sendMessage(from, { text:abc },{ quoted: mek });

const messageID = sentMsg.key.id;

conn.ev.on('messages.upsert', async (messageUpdate) => {
    const mek = messageUpdate.messages[0];
    if (!mek.message) return;
    const messageType = mek.message.conversation || mek.message.extendedTextMessage?.text;
    const from = mek.key.remoteJid;
    const sender = mek.key.participant || mek.key.remoteJid;

    // Check if the message is a reply to the previously sent message
    const isReplyToSentMsg = mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo.stanzaId === messageID;

    if (isReplyToSentMsg) {
    await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });
    await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });
  if (messageType === '1') {
await conn.sendMessage(from, { document : { url : pp2 } ,mimetype: "video/mp4",fileName: `🎬 ASITHA-MD 🎬\n${urll.result.data.title}.mkv`,caption :`> ${urll.result.data.title}\n\n> 480p\n\n> *POWERED by ASITHA-MD*` }, { quoted: mek })
  }else if (messageType === '2') {
    await conn.sendMessage(from, { document : { url : pp1  } ,mimetype: "video/mp4",fileName: `🎬 ASITHA-MD 🎬\n${urll.result.data.title}.mkv`,caption :`> ${urll.result.data.title}\n\n> 720p\n\n> *POWERED by ASITHA-MD*` }, { quoted: mek })
  }else if (messageType === '3'){
await conn.sendMessage(from, { document : { url : pp  } ,mimetype: "video/mp4",fileName: `🎬 ASITHA-MD 🎬\n${urll.result.data.title}.mkv`,caption :`> ${urll.result.data.title}\n\n> 1080p\n\n> *POWERED by ASITHA-MD*` }, { quoted: mek })
}  
await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
console.log("Response sent successfully");
} });
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
});
