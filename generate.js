const generateTemplateFiles = require("generate-template-files").generateTemplateFiles;
const StringUtility = require("generate-template-files").StringUtility;
const CaseConverterEnum = require("generate-template-files").CaseConverterEnum;
const fs = require("fs");

const BLOCK_TEMPLATES_DIR = "./generator/block";
const VIEW_BLOCK_TEMPLATES_DIR = "./generator/block-with-view";
const OUTPUT_DIR = "./src/blocks";

generateTemplateFiles([
    {
        option: "Create Block",
        defaultCase: "(kebabCase)",
        entry: {
            folderPath: BLOCK_TEMPLATES_DIR
        },
        stringReplacers: ["__namespace__", "__block__", "__description__", "__icon__", "__category__"],
        output: {
            path: `${OUTPUT_DIR}/__block__`,
            pathAndFileNameDefaultCase: "(kebabCase)"
        },
        onComplete: data => {
            console.log("\n Generating... \n");
            // writing the block.js file into the index.js file in the parent directory of block assets
            try {
                const { slotValue } = data.stringReplacers.find(el => el.slot === "__block__");
                const formattedSlotValue = StringUtility.toCase(slotValue, CaseConverterEnum.KebabCase);

                const editorJs = fs.createWriteStream(`./src/index.js`, { flags: "a" });
                console.log("\nWriting block to index.js...\n");
                editorJs.write('import "./blocks/' + formattedSlotValue + '/index.js";\n');

                const stylesSass = fs.createWriteStream(`./src/blocks.style.sass`, { flags: "a" });
                console.log("\nWriting block to blocks.style.sass...\n");
                stylesSass.write('@import "./blocks/' + formattedSlotValue + '/styles"\n');

                const stylesEditorSass = fs.createWriteStream(`./src/blocks.editor.sass`, { flags: "a" });
                console.log("\nWriting block to blocks.editor.sass...\n");
                stylesEditorSass.write('@import "./blocks/' + formattedSlotValue + '/styles.editor"\n');

                console.log("\n\n🧱  Done!  Enjoy your blocks! 🧱\n\n");
            } catch (err) {
                console.log("Yikes!  an error:", err);
            }
        }
    },
    {
        option: "Create Block with View Script (front-end)",
        defaultCase: "(kebabCase)",
        entry: {
            folderPath: VIEW_BLOCK_TEMPLATES_DIR
        },
        stringReplacers: ["__namespace__", "__block__", "__description__", "__icon__", "__category__"],
        output: {
            path: `${OUTPUT_DIR}/__block__`,
            pathAndFileNameDefaultCase: "(kebabCase)"
        },
        onComplete: data => {
            console.log("\n Generating... \n");
            // writing the block.js file into the index.js file in the parent directory of block assets
            try {
                const { slotValue } = data.stringReplacers.find(el => el.slot === "__block__");
                const formattedSlotValue = StringUtility.toCase(slotValue, CaseConverterEnum.KebabCase);

                const editorJs = fs.createWriteStream(`./src/index.js`, { flags: "a" });
                console.log("\nWriting block to index.js...\n");
                editorJs.write('import "./blocks/' + formattedSlotValue + '/index.js";\n');

                const stylesSass = fs.createWriteStream(`./src/blocks.style.sass`, { flags: "a" });
                console.log("\nWriting block to blocks.style.sass...\n");
                stylesSass.write('@import "./blocks/' + formattedSlotValue + '/styles"\n');

                const stylesEditorSass = fs.createWriteStream(`./src/blocks.editor.sass`, { flags: "a" });
                console.log("\nWriting block to blocks.editor.sass...\n");
                stylesEditorSass.write('@import "./blocks/' + formattedSlotValue + '/styles.editor"\n');

                const frontendJs = fs.createWriteStream(`/src/frontend.js`, { flags: "a" });
                console.log("Writing block to frontend.js...\n");
                frontendJs.write('import "./' + formattedSlotValue + "/" + formattedSlotValue + '.view.js";\n');

                console.log("\n🧱  Done!  Enjoy your blocks! 🧱\n\n");
            } catch (err) {
                console.log("Yikes!  an error:", err);
            }
        }
    }
]);
