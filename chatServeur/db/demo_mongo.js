
const db = require('../db/mongo')
async function main() {
  console.log( await db.users.findUserByPseudo("new user"));
  console.log(await db.users.isUserAuth({pseudo: "new user", password:"password"}))
  //console.log( await db.users.findSeveralUserByPseudo(["new user"]));

}

main();
