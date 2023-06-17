
//-----     comments table model        -----

module.exports = (sequelize, Sequelize) => {
    
    const Comment = sequelize.define("comments", {
        commentID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        postID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT('medium'),
            allowNull: false,
        },
        isPublish: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
    });

    return Comment;

};