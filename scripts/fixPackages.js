import fs from "fs";
import path from "path";

const packageFolder = path.join(process.cwd(), "src/data/packages");

const files = fs
  .readdirSync(packageFolder)
  .filter((file) => file.endsWith(".json"));

for (const file of files) {
  const filePath = path.join(packageFolder, file);

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // -----------------------------------
  // Fix Status
  // -----------------------------------
  if (data.status === "published") {
    data.status = "active";
  }

  // -----------------------------------
  // Fix paymentSchedule
  // -----------------------------------
  if (data.data?.paymentSchedule) {
    if (typeof data.data.paymentSchedule === "string") {
      data.data.paymentSchedule = [
        {
          title: "Booking Amount",
          amount: data.data.paymentSchedule,
        },
      ];
    }

    if (
      Array.isArray(data.data.paymentSchedule) &&
      typeof data.data.paymentSchedule[0] === "string"
    ) {
      data.data.paymentSchedule =
        data.data.paymentSchedule.map((item, index) => ({
          title: `Installment ${index + 1}`,
          amount: item,
        }));
    }
  }

  // -----------------------------------
  // Fix cancellationPolicy
  // -----------------------------------
  if (
    Array.isArray(data.data?.cancellationPolicy) &&
    typeof data.data.cancellationPolicy[0] === "object"
  ) {
    data.data.cancellationPolicy =
      data.data.cancellationPolicy.map(
        (item) => `${item.timing} - ${item.fee}`
      );
  }

  // -----------------------------------
  // Fix whatToPack
  // -----------------------------------
  if (
    Array.isArray(data.data?.whatToPack) &&
    typeof data.data.whatToPack[0] === "object"
  ) {
    let items = [];

    data.data.whatToPack.forEach((section) => {
      if (Array.isArray(section.items)) {
        items.push(...section.items);
      }
    });

    data.data.whatToPack = items;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`✔ Fixed ${file}`);
}

console.log("\nAll package files fixed successfully.");