"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlobalExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const pony_cause_1 = require("pony-cause");
const base_exception_1 = require("./base.exception");
const server_exception_dto_1 = require("./server.exception.dto");
const validation_exception_1 = require("./validation.exception");
let GlobalExceptionsFilter = GlobalExceptionsFilter_1 = class GlobalExceptionsFilter extends core_1.BaseExceptionFilter {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(GlobalExceptionsFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const eName = exception === null || exception === void 0 ? void 0 : exception.name;
        const eMsg = process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : (0, pony_cause_1.messageWithCauses)(exception);
        console.error('GlobalExceptionsFilter catch', exception.name);
        const dto = new server_exception_dto_1.ServerExceptionDto(common_1.HttpStatus.INTERNAL_SERVER_ERROR, eMsg, eName);
        if (exception instanceof base_exception_1.Exception) {
            dto.status = exception.status;
            if (exception instanceof validation_exception_1.ValidationException) {
                dto.validationErrors = exception.details;
            }
        }
        if (exception instanceof common_1.HttpException) {
            dto.status = exception.getStatus();
        }
        this.logger.error((0, pony_cause_1.messageWithCauses)(exception), (0, pony_cause_1.stackWithCauses)(exception));
        response
            .status(dto.status)
            .send(dto);
    }
};
GlobalExceptionsFilter = GlobalExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionsFilter);
exports.GlobalExceptionsFilter = GlobalExceptionsFilter;
//# sourceMappingURL=exceptions-filter.js.map