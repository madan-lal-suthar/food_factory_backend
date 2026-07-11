"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// QueryHelper.js
class QueryHelper {
    queryString;
    constructor(queryString) {
        this.queryString = queryString;
    }
    // Method to count '?' in the query string
    countPlaceholders() {
        return (this.queryString.match(/\?/g) || []).length;
    }
    // Method to prepare parameters by filling missing ones with null
    prepareParameters(params) {
        const questionMarkCount = this.countPlaceholders();
        // If params are less than the number of placeholders, add nulls
        if (!Array.isArray(params)) {
            params = [];
        }
        if (params.length < questionMarkCount) {
            // Add nulls for the remaining placeholders
            params = [...params, ...new Array(questionMarkCount - params.length).fill(null)];
        }
        return params;
    }
}
exports.default = QueryHelper;
