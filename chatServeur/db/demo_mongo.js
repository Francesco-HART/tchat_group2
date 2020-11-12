
const db = require('../db/mongo')
async function main() {
  /*await client.connect(); // on se connecte au serveur mongo
  const db = client.db("bnzzp8d394kena7"); // use DaMovies
  */
  console.log( await db.users.findUserByName({pseudo:"new user"}));
  console.log(await db.users.isUserAuth({pseudo: "new user", password:"password"}))
  //console.log(await db.users.insertUSer({pseudo: "new test", password:"password"}))

  // const coll_list = await db.collections()
  // console.log({ colls: coll_list[0].s })
}

main();
