"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dbConfig_1 = require("./database/dbConfig");
const roomRoutes_1 = __importDefault(require("./routes/roomRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use('/', roomRoutes_1.default);
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    try {
        await dbConfig_1.sequelize.sync();
        console.log('Models synced with database successfully.');
    }
    catch (error) {
        console.error('Unable to sync models with database:', error);
    }
});
