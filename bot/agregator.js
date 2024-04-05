"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBot = void 0;
var client_1 = require("@prisma/client");
var telegraf_1 = require("telegraf");
var tagTableFormatted_json_1 = require("./tagTableFormatted.json");
// var debug = console.log.bind(window.console);
function initBot() {
    return __awaiter(this, void 0, void 0, function () {
        function stringsToGrid(strings) {
            return strings.reduce(function (result, value, index) {
                if (index % 2 === 0) {
                    if (strings[index + 1] !== undefined)
                        result.push([value, value]);
                    else
                        result.push([value]);
                }
                return result;
            }, []);
        }
        function buttonsTag(ctx, strings) {
            var grid = [];
            strings.forEach(function (tag, tagInd) {
                if (!sortingTags(ctx).includes(tag)) {
                    grid.push(telegraf_1.Markup.button.callback(tag, "add_".concat(shortHash(tag))));
                }
                else {
                    grid.push(telegraf_1.Markup.button.callback(tag, "remove_".concat(shortHash(tag))));
                }
            });
            grid.push(telegraf_1.Markup.button.callback("Назад", "back"));
            return grid;
        }
        function gridButtonsTag(ctx, stringsGrid) {
            var grid = [];
            stringsGrid.forEach(function (line, lineInd) {
                grid.push([]);
                line.forEach(function (tag, tagInd) {
                    if (!sortingTags(ctx).includes(tag)) {
                        grid[lineInd].push(telegraf_1.Markup.button.callback(tag, "add_".concat(shortHash(tag))));
                    }
                    else {
                        grid[lineInd].push(telegraf_1.Markup.button.callback(tag, "remove_".concat(shortHash(tag))));
                    }
                });
            });
            return grid;
        }
        function buttonsGroups(ctx, strings) {
            var grid = [];
            strings.forEach(function (group, groupInd) {
                grid.push(telegraf_1.Markup.button.callback(group, "select_".concat(shortHash(group))));
            });
            return grid;
        }
        function gridButtonsGroup(ctx, stringsGrid) {
            var grid = [];
            stringsGrid.forEach(function (line, lineInd) {
                grid.push([]);
                line.forEach(function (group, groupInd) {
                    grid[lineInd].push(telegraf_1.Markup.button.callback(group, "select_".concat(shortHash(group))));
                });
            });
            return grid;
        }
        var stageNumber, sortingTags, selectedGroup, tagGroupActionName, tagActionName, backActionName, selectGroupControlsStep, selectTagControlsStep, selectGroupInitWizard, selectGroupWizard, selectTagWizard, prisma, bot, stage;
        var _this = this;
        return __generator(this, function (_a) {
            stageNumber = function (ctx) { return "[Stage ".concat(ctx.wizard.cursor, "]"); };
            sortingTags = function (ctx) { return ctx.scene.session.sortingTags; };
            selectedGroup = function (ctx) { return ctx.scene.session.selectedGroup; };
            tagGroupActionName = "tagGroup";
            tagActionName = "tagAction";
            backActionName = "backAction";
            selectGroupControlsStep = new telegraf_1.Composer();
            selectTagControlsStep = new telegraf_1.Composer();
            selectGroupInitWizard = new telegraf_1.Scenes.WizardScene('SELECT_GROUP_INIT_SCENE', 
            // 0 — Tag groups
            function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                var keyboard, _a;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            console.log("".concat(stageNumber(ctx), " natural step [Init, Groups]"));
                            if (!(((_b = ctx.chat) === null || _b === void 0 ? void 0 : _b.type) === "private")) return [3 /*break*/, 2];
                            ctx.scene.session.sortingTags = [];
                            keyboard = buttonsGroups(ctx, tagTableFormatted_json_1.default.map(function (element) { return element.title; }));
                            _a = ctx.scene.session;
                            return [4 /*yield*/, ctx.replyWithMarkdownV2("Выберите группу тэгов:", telegraf_1.Markup.inlineKeyboard(keyboard, { columns: 2 }))];
                        case 1:
                            _a.initialMessage = _c.sent();
                            _c.label = 2;
                        case 2: return [2 /*return*/, ctx.wizard.next()];
                    }
                });
            }); }, 
            // 1
            selectGroupControlsStep);
            selectGroupWizard = new telegraf_1.Scenes.WizardScene('SELECT_GROUP_SCENE', 
            // async (ctx) => {
            //     console.log(`${stageNumber(ctx)} natural step [Groups]`)
            //     const selectedGroupTags = tagTable.find(group => group.title === selectedGroup(ctx))?.tags.map(arr => arr[0]);
            //     console.log(selectedGroup(ctx))
            //     const keyboard = gridButtonsTag(ctx, stringsToGrid(selectedGroupTags ?? []))
            //     // const msg = ctx.scene.session.initialMessage;
            //     ctx.editMessageReplyMarkup(
            //         Markup.inlineKeyboard(keyboard).reply_markup
            //     )
            //     return ctx.wizard.next();
            // },
            selectGroupControlsStep);
            selectTagWizard = new telegraf_1.Scenes.WizardScene('SELECT_TAG_SCENE', 
            // async (ctx) => {
            //     console.log(`${stageNumber(ctx)} natural step [Tags]`)
            //     const selectedGroupTags = tagTable.find(group => group.title === selectedGroup(ctx))?.tags.map(arr => arr[0]);
            //     console.log(selectedGroup(ctx))
            //     const keyboard = buttonsTag(ctx, selectedGroupTags ?? [])
            //     // const msg = ctx.scene.session.initialMessage;
            //     ctx.editMessageReplyMarkup(
            //         Markup.inlineKeyboard(keyboard, {columns: 2}).reply_markup
            //     )
            //     return ctx.wizard.next();
            // },
            selectTagControlsStep);
            prisma = new client_1.PrismaClient();
            bot = new telegraf_1.Telegraf("6310763994:AAHDQmMX0_vhBs4tvMHipOS6pSaatCfoAuo");
            stage = new telegraf_1.Scenes.Stage([selectGroupInitWizard, selectGroupWizard, selectTagWizard]);
            bot.use((0, telegraf_1.session)());
            bot.use(stage.middleware());
            bot.launch();
            bot.start(function (ctx) { return ctx.reply('Бот подключен'); });
            // Prepare all the actions for tags
            tagTableFormatted_json_1.default.forEach(function (group, groupIndex) {
                var groupTitle = group.title;
                // Prepare group actions
                selectGroupControlsStep.action("select_".concat(shortHash(groupTitle)), function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        ctx.scene.session.selectedGroup = groupTitle;
                        console.log("".concat(stageNumber(ctx), " group selected \u2014 ").concat(groupTitle));
                        ctx.scene.enter("SELECT_TAG_SCENE");
                        return [2 /*return*/];
                    });
                }); });
                // Prepare hashtag actions
                group.tags.forEach(function (groupTags, tagIndex) {
                    var tag = groupTags[0];
                    selectTagControlsStep.action("add_".concat(shortHash(tag)), function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (!ctx.scene.session.sortingTags.includes(tag)) {
                                ctx.scene.session.sortingTags.push(tag);
                            }
                            console.log("".concat(stageNumber(ctx), " tag selected"));
                            return [2 /*return*/, ctx.wizard.selectStep(1)];
                        });
                    }); });
                    selectTagControlsStep.action("remove_".concat(shortHash(tag)), function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (ctx.scene.session.sortingTags.includes(tag)) {
                                ctx.scene.session.sortingTags = ctx.scene.session.sortingTags.filter(function (item) { return item !== tag; });
                            }
                            console.log("".concat(stageNumber(ctx), " tag removed"));
                            return [2 /*return*/, ctx.wizard.selectStep(1)];
                        });
                    }); });
                });
            });
            selectGroupControlsStep.use(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                var selectedGroupTags, keyboard;
                var _a;
                return __generator(this, function (_b) {
                    console.log("".concat(stageNumber(ctx), " natural step [Groups]"));
                    selectedGroupTags = (_a = tagTableFormatted_json_1.default.find(function (group) { return group.title === selectedGroup(ctx); })) === null || _a === void 0 ? void 0 : _a.tags.map(function (arr) { return arr[0]; });
                    console.log(selectedGroup(ctx));
                    keyboard = gridButtonsTag(ctx, stringsToGrid(selectedGroupTags !== null && selectedGroupTags !== void 0 ? selectedGroupTags : []));
                    // const msg = ctx.scene.session.initialMessage;
                    ctx.editMessageReplyMarkup(telegraf_1.Markup.inlineKeyboard(keyboard).reply_markup);
                    return [2 /*return*/, ctx.wizard.next()];
                });
            }); });
            selectTagControlsStep.action("back", function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log("".concat(stageNumber(ctx), " back"));
                    ctx.scene.enter("SELECT_GROUP_SCENE");
                    return [2 /*return*/];
                });
            }); });
            selectTagControlsStep.use(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                var selectedGroupTags, keyboard;
                var _a;
                return __generator(this, function (_b) {
                    console.log("".concat(stageNumber(ctx), " natural step [Tags]"));
                    selectedGroupTags = (_a = tagTableFormatted_json_1.default.find(function (group) { return group.title === selectedGroup(ctx); })) === null || _a === void 0 ? void 0 : _a.tags.map(function (arr) { return arr[0]; });
                    console.log(selectedGroup(ctx));
                    keyboard = buttonsTag(ctx, selectedGroupTags !== null && selectedGroupTags !== void 0 ? selectedGroupTags : []);
                    // const msg = ctx.scene.session.initialMessage;
                    ctx.editMessageReplyMarkup(telegraf_1.Markup.inlineKeyboard(keyboard, { columns: 2 }).reply_markup);
                    return [2 /*return*/, ctx.wizard.next()];
                });
            }); });
            bot.command("search", function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    ctx.scene.reset();
                    ctx.scene.enter("SELECT_GROUP_INIT_SCENE");
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.initBot = initBot;
var shortHash = function (word) {
    return String(word.split('').reduce(function (acc, char) { return (acc * 31) + char.charCodeAt(0); }, 0));
};
initBot();
