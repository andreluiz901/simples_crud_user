const { createConnectionDatabase, disconnectDatabase } = require("../../config/database");

async function createNewPost(messagePost, dateCreated, ownerId) {
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'INSERT INTO public.posts (date_created, date_last_update, message, id_creator) VALUES ($1, $1, $2, $3) RETURNING id',[dateCreated, messagePost, ownerId])
    await disconnectDatabase(clientDatabase)
    return {id:responseQuery.rows[0].id, messagePost, dateCreated}
}

async function getPostAgendaPageLimit(offset, limit) {
    
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'SELECT * FROM public.posts ORDER BY date_created DESC LIMIT $1 OFFSET $2',[limit, offset]
    )
    const totalRows = await clientDatabase.query(
        'SELECT COUNT(id) FROM public.posts'
    )
    await disconnectDatabase(clientDatabase)
    return {count:totalRows.rows[0].count, data:responseQuery.rows}
}


// async function checkOwnerPost(idUser, idPost) {
//     const clientDatabase = await createConnectionDatabase();
//     const responseQuery = await clientDatabase.query(
//         'SELECT id, message FROM public.posts WHERE id_creator = $1 AND id=$2', [idUser, idPost])
//     await disconnectDatabase(clientDatabase)
//     return await {count:responseQuery.rows[0], rows:responseQuery.rows}
// }

async function deletePost(idUser, idPost){
    const clientDatabase = await createConnectionDatabase();
    const responseQuery = await clientDatabase.query(
        'DELETE FROM public.posts WHERE id_creator=$1 AND id=$2', [idUser, idPost])
    await disconnectDatabase(clientDatabase)
    return await responseQuery
}



module.exports = {createNewPost, getPostAgendaPageLimit, deletePost}