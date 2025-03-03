const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOElPdHlCZXdoU3BhYWVzYllkVGxOM2xMRmoyV0JtM2ZjUG9vZGE4T3EyUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0xLU2dhNTNCc3JSQ3FsVkVvMUhOUzMxVDlxeUx0b25DeGRaakxvSUUwRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBRkVFZ0x2MzNKSFd5djVWVVl1R1NHNmx6VzFyQys1SzZlLzByOUtHK1VrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJSnF2SFRRek1NUnVRYVEwSjdpcTU3UmpTMkFlTVRNTmpubm5JMUR5VXhnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNKWWUzZjZVay9FejJOZFYrQThxZW9DSlhqTXVMYllpN2lYejM4NmdUbVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtrVUZaeFZCSVd4enZIdFdUQWF0UFdCQ2pTQzB4b2ZrUll2cFVyK003RkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUljMWRzWEJhREdCd0IwZHpXemVPTkRSNlEvMkZ2bFlpN0lnQ0tqd0lVUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXY0aUw3UTBmT3Zjc2liejkrSGlqVFhtUjFaTVBvNVNXQTZjUm9IdkNRcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFtRlU5ZlBzWFRZUlozemJscklEWmUrVS91dEZDdjM5WUZxZTVhcjlBTEV3anp3eWphUmp3eEVNY1Z3TDIrWVBwOEQzTGFsVkEzczlINFBLbWdpQkN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM0LCJhZHZTZWNyZXRLZXkiOiJnYUw3UHJ0Q3JZMUdCajA0UDZsVS8zeXNJTDdReWNvWXRTOUNzd2FjdkIwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIyLXdsZ2Q5UlQtaXd5a3lhUVRkMmxRIiwicGhvbmVJZCI6ImFhOWVmOWJjLWJmYzUtNDQ3YS05YmFhLTlhN2VlYmE1M2I4YiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwN0ZNcUJaMzk2UDRzVVJyOHlaeVFCbm95RFE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZFdrK2RpNEdmU0N4cEdTU0hMVEJhUmlHbFpjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhRRlNFWDQ5IiwibWUiOnsiaWQiOiI1MDk0MTA5MTM5Nzo5QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJRHkycElDRUwrcW1MNEdHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJsZEZJRldmWldQVEJLamZ3WUdnaVZZYjQ0QmM1WHdtMUtFVUgzNDQvcDBNPSIsImFjY291bnRTaWduYXR1cmUiOiJLbm5KOHJJZkVFMENoRSs1eDJ1R3BXRzI1Q043SEJCZXd1Rjh6YVdmbnJtU0QzVUlXY0JnSWo5TW1XMUxhMXNxc214Smk1ZGh0Q3JWczdYTTZzSk1BUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVlY4akF0cFp4VGhzTjBuSUdpVFVBa3kvekM4S3E5SlQyOENBUU83VWdjS2trK3U2L3BiNVQzcW5tUEltYWxzTEowamRmOEhoQUJIZFhrWG1CVC9WQkE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MDk0MTA5MTM5Nzo5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpYUlNCVm4yVmowd1NvMzhHQm9JbFdHK09BWE9WOEp0U2hGQjkrT1A2ZEQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDEwMzQ4Mjh9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Njabulo",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Njabulo",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
