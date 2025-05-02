const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const processImage = async (inputPath, outputPath) => {
  await sharp(inputPath)
    .resize(800, 450, { fit: "cover" })
    .webp({ quality: 85 })
    .toFile(outputPath);
  console.log(`Processed: ${outputPath}`);
};

const projectsDir = path.join(__dirname, "../public/projects");

// Ensure projects directory exists
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

// Process each image
const processImages = async () => {
  const images = [
    "healthcare-platform.png",
    "covid-detection.png",
    "insurance-suite.png",
  ];

  for (const image of images) {
    const inputPath = path.join(__dirname, "source-images", image);
    const outputPath = path.join(projectsDir, image.replace(".png", ".webp"));

    if (fs.existsSync(inputPath)) {
      await processImage(inputPath, outputPath);
    } else {
      console.log(`Warning: Source image not found: ${inputPath}`);
    }
  }
};

processImages().catch(console.error);
