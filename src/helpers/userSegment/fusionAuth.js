const insertUserData = (data, credentials) => {};

const filterSample = {
  userLocation: [
    {
      state: "Haryana",
      district: "Ambala",
    },
    {
      state: "Haryana",
      district: "Panipat",
      block: "Panipat",
    },
  ],
  roles: ["PUBLIC"],
  userType: {
    type: "student",
  },
  framework: {
    board: ["State Board 3"],
    gradeLevel: [1],
  },
};

class QueryBuilder {
  constructor(filters) {
    this.filters = filters;
    this.prefixSingle = "(";
    this.postfixSingle = ")";
    this.ORChar = " OR ";
    this.ANDChar = " AND ";
    this.dataPrefix = "data";
    this.fieldSeparator = ".";
    this.keySeparator = " : ";
    this.roleKey = "roles";
    this.locationKey = "userLocation";
    this.frameworkKey = "framework";
    this.userTypeKey = "userType.type";
    this.quotes = "'";
  }

  checkBrackets = (str) => {
    // depth of the parenthesis
    // ex : ( 1 ( 2 ) ( 2 ( 3 ) ) )
    var depth = 0;
    // for each char in the string : 2 cases
    for (var i in str) {
      if (str[i] == "(") {
        // if the char is an opening parenthesis then we increase the depth
        depth++;
      } else if (str[i] == ")") {
        // if the char is an closing parenthesis then we decrease the depth
        depth--;
      }
      //  if the depth is negative we have a closing parenthesis
      //  before any matching opening parenthesis
      if (depth < 0) return false;
    }
    // If the depth is not null then a closing parenthesis is missing
    if (depth > 0) return false;
    // OK !
    return true;
  };

  buildLocation = () => {
    return {
      query: this.filters.userLocation
        .map((location) => {
          const d = [];
          Object.entries(location).forEach(([key, value]) => {
            d.push(
              this.prefixSingle +
                this.dataPrefix +
                this.fieldSeparator +
                this.locationKey +
                this.fieldSeparator +
                key +
                this.keySeparator +
                this.quotes +
                value +
                this.quotes +
                this.postfixSingle
            );
          });
          return d.join(this.ANDChar);
        })
        .map((s) => this.prefixSingle + s + this.postfixSingle)
        .join(this.ORChar),
      total: this.filters.userLocation.length,
    };
  };

  buildRoles = () => {
    return {
      query: this.filters.roles
        .map((role) => {
          return (
            this.prefixSingle +
            this.dataPrefix +
            this.fieldSeparator +
            this.roleKey +
            this.keySeparator +
            role +
            this.postfixSingle
          );
        })
        .join(this.ORChar),
      total: this.filters.roles.length,
    };
  };

  buildUserTypes = () => {
    if (
      this.filters.userType !== undefined &&
      this.filters.userType.type !== undefined
    ) {
      console.lo;
      return {
        query:
          this.prefixSingle +
          this.dataPrefix +
          this.fieldSeparator +
          this.userTypeKey +
          this.keySeparator +
          this.filters.userType.type +
          this.postfixSingle,
        total: 1,
      };
    } else {
      return {
        query: "",
        total: 0,
      };
    }
  };

  buildFramework = () => {
    return {
      query: "",
      total: 0,
    };
  };

  buildQuery = () => {
    const queries = [
      this.buildLocation(),
      this.buildRoles(),
      this.buildUserTypes(),
      this.buildFramework(),
    ];
    const query = queries
      .filter((s) => s.total > 0)
      .map((s) => {
        if (s.total > 1)
          return this.prefixSingle + s.query + this.postfixSingle;
        else return s.query;
      })
      .join(this.ANDChar);
    return this.checkBrackets(query) ? query : "";
  };
}

module.exports = {
  QueryBuilder,
};
