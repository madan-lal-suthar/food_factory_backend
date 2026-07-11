"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrototypeExtensions = void 0;
class PrototypeExtensions {
    // Method to extend the Array prototype
    static extendArrayPrototype() {
        Object.defineProperty(Array.prototype, "isEmpty", {
            get: function () {
                // Returns true if the array has no elements
                return this.length === 0;
            },
        });
        Object.defineProperty(Array.prototype, "isNotEmpty", {
            get: function () {
                // Returns true if the array has one or more elements
                return this.length > 0;
            },
        });
        Object.defineProperty(Array.prototype, "first", {
            get: function () {
                // Returns the first element of the array, or undefined if the array is empty
                return this.length > 0 ? this[0] : undefined;
            },
        });
    }
    // Method to extend the String prototype
    static extendStringPrototype() {
        Object.defineProperty(String.prototype, "isEmpty", {
            get: function () {
                // Returns true if the string is empty
                return this.length === 0;
            },
        });
        Object.defineProperty(String.prototype, "isNotEmpty", {
            get: function () {
                // Returns true if the string has one or more characters
                return this.length > 0;
            },
        });
        Object.defineProperty(String.prototype, "capitalize", {
            get: function () {
                // Capitalizes the first letter of the string
                return this.charAt(0).toUpperCase() + this.slice(1);
            },
        });
    }
    // Method to extend the Number prototype
    static extendNumberPrototype() {
        Number.prototype.toBool = function () {
            // Returns true if the number is 1, otherwise false
            return this == 1;
        };
        Number.prototype.isZero = function () {
            // Returns true if the number is 1, otherwise false
            return this === 0;
        };
        Number.prototype.fmt2d = function () {
            // Round and convert back to number
            return parseFloat(this.toFixed(2));
        };
    }
    // Method to initialize all extensions
    static initializeAll() {
        this.extendArrayPrototype();
        this.extendStringPrototype();
        this.extendNumberPrototype();
    }
}
exports.PrototypeExtensions = PrototypeExtensions;
