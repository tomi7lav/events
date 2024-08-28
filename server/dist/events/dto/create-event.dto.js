"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventDto = void 0;
const class_validator_1 = require("class-validator");
class CreateEventDto {
}
exports.CreateEventDto = CreateEventDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Event name is required' }),
    (0, class_validator_1.IsString)({ message: 'Event name must be a string' }),
    (0, class_validator_1.MinLength)(3, { message: 'Event name must be at least 3 characters long' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Event name must not exceed 100 characters' }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Event date is required' }),
    (0, class_validator_1.IsDateString)({}, { message: 'Invalid date format. Please use YYYY-MM-DD' }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Event description is required' }),
    (0, class_validator_1.IsString)({ message: 'Event description must be a string' }),
    (0, class_validator_1.MinLength)(10, {
        message: 'Event description must be at least 10 characters long',
    }),
    (0, class_validator_1.MaxLength)(1000, {
        message: 'Event description must not exceed 1000 characters',
    }),
    __metadata("design:type", String)
], CreateEventDto.prototype, "description", void 0);
//# sourceMappingURL=create-event.dto.js.map