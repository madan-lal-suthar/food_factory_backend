import localizeString from "../localization/localize.string";
import CommonError from "../error.handler/common.error";
import LocalizationKeys from "../localization/localization.keys";
class ValidationUtils {
    // Validate required fields dynamically and return them in order
    static validateFields(
        req: any,
        res: any,
        fields: string[] = [],
        vaildationType: "optional" | "required" = "optional"
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                let bodyField: Record<string, any> = req.body ?? {};
                if (vaildationType === "optional") {
                    let bodyKeys: string[] = Object.keys(bodyField);
                    if (bodyKeys.every((key: string) => fields.includes(key))) {
                        return resolve(true);
                    }
                    let missingKeys: string[] = bodyKeys.filter((key: string) => !fields.includes(key));
                    for (let key of missingKeys) {
                        if (ValidationUtils.fieldValidation(bodyField[key])) {
                            let checkMessage = localizeString.checkStrLocalization(
                                key.toUpperCase(),
                                req.headers["language"]
                            );
                            throw new CommonError({
                                status: 400,
                                key: checkMessage ? key.toUpperCase() : LocalizationKeys.VALIDATE_FIELD_REQUIRED,
                                language: req.headers["language"],
                                dynamicParams: {
                                    fieldName: key.charAt(0).toUpperCase() + key.slice(1)
                                }
                            });
                        }
                    }
                } else {
                    if (fields.every((key: string) => !ValidationUtils.fieldValidation(bodyField[key]))) {
                        return resolve(true);
                    }
                    for (let key of fields) {
                        if (ValidationUtils.fieldValidation(bodyField[key])) {
                            let checkMessage = localizeString.checkStrLocalization(
                                key.toUpperCase(),
                                req.headers["language"]
                            );
                            throw new CommonError({
                                status: 400,
                                key: checkMessage ? key.toUpperCase() : LocalizationKeys.VALIDATE_FIELD_REQUIRED,
                                language: req.headers["language"],
                                dynamicParams: {
                                    fieldName: key.charAt(0).toUpperCase() + key.slice(1)
                                }
                            });
                        }
                    }
                }
            } catch (error) {
                // console.log("validation error ====>>>>", error);
                throw error;
            }
        });
    }
    static fieldValidation(fieldValue: any): boolean | "object" {
        // Check for undefined, null, or empty string
        if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
            return true; // Field is missing/invalid
        }

        // Check if value is an array
        if (Array.isArray(fieldValue)) {
            return fieldValue.length === 0; // true if empty array
        }

        // Check if value is an object (but not null or array)
        if (typeof fieldValue === 'object' && fieldValue !== null && !Array.isArray(fieldValue)) {
            const isEmptyObject = Object.keys(fieldValue).length === 0;
            return isEmptyObject ? true : 'object'; // true if empty object, else 'object'
        }

        // Check for other primitives
        if (
            typeof fieldValue === 'string' ||
            typeof fieldValue === 'number' ||
            typeof fieldValue === 'boolean'
        ) {
            return false; // Valid value
        }

        // Fallback for other types (e.g., functions, symbols, BigInt, etc.)
        return true;
    }
    //     const missingKeys = [];
    
    //     for (const key of requiredFields) {
    //         const isInvalid = this.fieldValidation(reqBody[key]);
    //         if (isInvalid === true) {
    //             missingKeys.push(key);
    //         }
    //     }
    
    //     if (missingKeys.length > 0) {
    //         return {
    //             status: false,
    //             message: localizeString.localize(missingKeys[0], req.headers["language"]),
    //             missingKeys
    //         };
    //     }
    
    //     return { status: true };
    // }
    
}

export default ValidationUtils;
