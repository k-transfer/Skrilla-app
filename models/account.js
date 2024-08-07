module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        balance: { type: DataTypes.FLOAT, defaultValue: 0.0 },
        currency: { type: DataTypes.STRING, allowNull: false,
            defaultValue: 'USD' },
    });
}