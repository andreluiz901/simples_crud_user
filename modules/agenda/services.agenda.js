const { getNowDate } = require('../../utils/utilities')
const agendaRepository = require('./repository.agenda')


function createNewAgendaPost(ownerdId, agendaPayload) {
    const {message} = agendaPayload
    const dateNow = getNowDate()
    const newPostCreated = agendaRepository.createNewPost(message, dateNow, ownerdId)
    return newPostCreated
}

function getPostsAgendaPaginated(page, limit) {
    const offsetPage = (limit*page)-limit
    return agendaRepository.getPostAgendaPageLimit(offsetPage, limit)
}

async function deletePostAgenda(idUser, idPost) {
    return agendaRepository.deletePost(idUser, idPost)
    // const isOwnerPost = await agendaRepository.checkOwnerPost(idUser, idPost)
    // if (String(isOwnerPost.rows)) {
    //     console.log("ownerPost", isOwnerPost)
    //     return agendaRepository.deletePost(idUser, idPost)
    //     //return {message:"Post Deletado com sucesso", idPost:isOwnerPost.rows[0].id, messagePost:isOwnerPost.rows[0].message}
    // } else {
    //     console.log("ownerPostElse", isOwnerPost)
    //     return {message:"Este Post não existe ou o Usuário não é o dono do Post"}
         
    // }

}

module.exports = {createNewAgendaPost, getPostsAgendaPaginated, deletePostAgenda}