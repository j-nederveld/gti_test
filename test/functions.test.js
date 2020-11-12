const convertTimeStamp = require("../public/assets/scripts/convertTimeStamp")

test("Can instantiate Employee instance", () => {
    const timestamp = 1604525340;
    expect(convertTimeStamp(timestamp)).toBe("4 Nov 2020")
  });
