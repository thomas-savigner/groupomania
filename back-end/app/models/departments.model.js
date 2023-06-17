
//-----     departments of users table model        -----

module.exports= (sequelize, Sequelize) => {
    const Department = sequelize.define("departments", {
        departmentID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Department;
    
};