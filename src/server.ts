import app from "./app";
const PORT = process.env.PORT || 8080;

async function main() {
  try {
    app.listen(PORT, () => {
      console.log(`server is running http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
main();
