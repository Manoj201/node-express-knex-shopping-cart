import KnexORM from "server/util/bookshelf";

const User = KnexORM.model("User", {
  tableName: "users",
  hidden: ["password"],
  merchants() {
    return this.hasMany(Merchant);
  },
});

const Merchant = KnexORM.model("Merchant", {
  tableName: "merchants",
});


export default {
  User,
  Merchant,
};
