import { ValidationArguments } from './ValidationArguments';

/**
 * Convert the constraint to a string to be shown in an error
 */
export function constraintToString(constraint: unknown): string {
  if (Array.isArray(constraint)) {
    return constraint.join(', ');
  }

  return `${constraint}`;
}

export class ValidationUtils {
  static replaceMessageSpecialTokens(
      message: string | ((args: ValidationArguments) => string),
      validationArguments: ValidationArguments
  ): string {

    let result: any = {
      property: validationArguments.property,
      target: validationArguments.targetName,
      value: validationArguments.value
    }
    if (validationArguments.constraints instanceof Array) {
      validationArguments.constraints.forEach((constraint, index) => {
        result[`constraint${index + 1}`] = constraintToString(constraint);
      });
    }

    return result;
  }
}

