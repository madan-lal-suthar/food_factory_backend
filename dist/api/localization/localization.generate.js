"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Load the en translations and existing LocalizationKeys
const en = require('./en');
const keysFilePath = path_1.default.join(__dirname, 'localization.keys.js');
// Read current keys file content
let keysFileContent = fs_1.default.readFileSync(keysFilePath, 'utf-8');
// Extract existing LocalizationKeys object
const keysRegex = /const LocalizationKeys\s*=\s*{([\s\S]*?)^};/m;
const match = keysFileContent.match(keysRegex);
if (!match) {
    console.error('Could not find LocalizationKeys object in localization.keys.js');
    process.exit(1);
}
let existingKeysRaw = match[1];
let existingKeys = {};
// Parse the keys into an object
existingKeysRaw.split('\n').forEach(line => {
    const keyMatch = line.trim().match(/^(\w+):/);
    if (keyMatch) {
        existingKeys[keyMatch[1]] = true;
    }
});
// Find missing keys
const missingKeys = Object.keys(en).filter(key => !(key in existingKeys));
if (missingKeys.length === 0) {
    console.log('✅ All keys are already present in LocalizationKeys.');
    process.exit(0);
}
console.log(`🛠️  Adding ${missingKeys.length} missing keys...`);
const newKeysString = missingKeys.map(key => `    ${key}: '${key}',`).join('\n');
// Insert new keys before closing brace of the object
const updatedContent = keysFileContent.replace(keysRegex, (fullMatch, group) => {
    return `const LocalizationKeys = {\n${group.trimEnd()}\n${newKeysString}\n};`;
});
// Write back to the keys file
fs_1.default.writeFileSync(keysFilePath, updatedContent, 'utf-8');
console.log('✅ Missing keys added to localization.keys.js');
