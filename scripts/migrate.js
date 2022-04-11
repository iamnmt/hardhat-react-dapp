function main() {
  const fs = require("fs");
  fs.copyFile(
    "artifacts/contracts/FundMe.sol/FundMe.json",
    "frontend/src/contracts/FundMe.json",
    (err) => {
      if (err) {
        console.log("Error Found:", err);
      } else {
        console.log("Migartion done");
      }
    }
  );
}

main();
