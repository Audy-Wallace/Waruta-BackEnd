"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const words = [
      {
        name: "Seblak",
        location: "Bandung",
        color: "orange",
        ingredient: "krupuk",
        taste: "spicy",
        clue: "Tidak lazim direbus",
        imgUrl:
          "https://img-global.cpcdn.com/recipes/742c57b6f5780625/160x160cq70/seblak-kuah-pedas-foto-resep-utama.jpg",
      },
      {
        name: "Indomie",
        location: "Jakarta",
        color: "yellow",
        ingredient: "flour",
        taste: "umami",
        clue: "King of MSG",
        imgUrl:
          "https://images-na.ssl-images-amazon.com/images/I/31sdotKodgL._AC_UL160_SR160,160_.jpg",
      },
      {
        name: "Bakmi",
        location: "China",
        color: "yellow",
        ingredient: "flour",
        taste: "umami",
        clue: "Tepung terigu",
        imgUrl:
          "https://s3-media3.fl.yelpcdn.com/bphoto/nRV-RPsu0fFdpLFgS03Jcw/168s.jpg",
      },
      {
        name: "Batagor",
        location: "Bandung",
        color: "golden brown",
        ingredient: "meat",
        taste: "umami",
        clue: "Bumbu kacang",
        imgUrl:
          "https://dikemas.com/uploads/2019/05/resep-batagor-enak-yang-bisa-kamu-jadikan-ladang-bisnis-180x145.jpg",
      },
    ];

    words.forEach((word) => {
      word.createdAt = word.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Words", words, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Words", null, {});
  },
};
