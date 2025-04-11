module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert("Users", [
      {
        username: "testuser",
        email: "test@example.com",
        password: "password123", // Hash password in real projects
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
