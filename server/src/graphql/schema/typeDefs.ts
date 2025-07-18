import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeArray = loadFilesSync(path.join(__dirname, "../typeDefs"), {
	extensions: ["graphql"],
});

const typeDefs = mergeTypeDefs(typeArray);
export default typeDefs;
