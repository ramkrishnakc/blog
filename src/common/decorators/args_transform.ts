// import {
//   IsBoolean,
//   IsInt,
//   IsNotEmpty,
//   IsString,
//   ValidateNested,
//   ValidationOptions,
// } from 'class-validator';
// import {
//   Transform,
//   TransformationType,
//   TransformOptions,
//   Type,
// } from 'class-transformer';

// /**
//  * A list of fields that have Transform attribute
//  */
// const transformedFields = new Map<any, Set<string>>();

// function ensureTargetFieldIsNotTransformedAlready(
//   target: any,
//   propertyKey: string,
// ): void | never {
//   let targetMarkedFields = transformedFields.get(target);

//   if (!targetMarkedFields) {
//     targetMarkedFields = new Set<string>();
//     transformedFields.set(target, targetMarkedFields);
//   }

//   if (targetMarkedFields.has(propertyKey)) {
//     throw new Error(
//       `${target.constructor.name}.${propertyKey} is already marked with Transform attribute or similar`,
//     );
//   }

//   targetMarkedFields.add(propertyKey);
// }

// /**
//  * Same as Transform but ensures that no other Transform was applied,
//  * directly or through other attributes e.g. ToInt or ToBoolean.
//  * If that's the case - crashes the app at the start.
//  */
// export function Transform2(
//   transformFn: (
//     value: any,
//     obj: any,
//     transformationType: TransformationType,
//   ) => any,
//   options?: TransformOptions,
// ): (target: any, key: string) => void {
//   return (target: any, propertyKey: string) => {
//     ensureTargetFieldIsNotTransformedAlready(target, propertyKey);

//     Transform(transformFn, options)(target, propertyKey);
//   };
// }

// // TODO: Replace @IsNumber() + @Transform(v => Number(v))) with @ToInt()
// /**
//  * Forcibly converts a value to a number and validates it.
//  */
// export function ToInt(validationOptions?: ValidationOptions): (target: any, key: string) => void {
//   return (target: any, propertyKey: string): void => {
//     Transform2(value => {
//       if (value === null || value === undefined || value === '') {
//         // need to work with IsOptional
//         return undefined;
//       }

//       if (validationOptions?.each) {
//         return value.map(Number);
//       }

//       return Number(value);
//     }, validationOptions)(target, propertyKey);

//     // using ToInt would result in duplicate Transform
//     IsInt(validationOptions)(target, propertyKey);
//   };
// }

// /**
//  * Forcibly converts a string value to array of number and validates it.
//  */
// export function StringToIntArray(
//   validationOptions?: ValidationOptions,
// ): (target: any, key: string) => void {
//   return (target: any, propertyKey: string): void => {
//     Transform2(value => {
//       if (value === null || value === undefined || value === '') {
//         // need to work with IsOptional
//         return undefined;
//       }

//       const valuesArray: string[] = value.split(',');

//       return valuesArray.map(value => Number(value.trim()));
//     }, validationOptions)(target, propertyKey);

//     // using ToInt would result in duplicate Transform
//     IsInt(validationOptions)(target, propertyKey);
//   };
// }

// const toBoolean = (value: unknown): boolean =>
//   ([1, '1', 'true', true] as unknown[]).includes(value);

// /**
//  * Forcibly converts a value to a boolean and validates it.
//  */
// export function ToBoolean(
//   validationOptions?: ValidationOptions,
// ): (target: any, key: string) => void {
//   return (target: any, propertyKey: string): void => {
//     Transform2(toBoolean, validationOptions)(target, propertyKey);

//     // using ToBoolean would result in duplicate Transform
//     IsBoolean(validationOptions)(target, propertyKey);
//   };
// }

// // TODO: Replace @ValidateNested() + @Type() with @ValidateNestedType()
// /**
//  * A combination of @ValidateNested and @Type
//  * Example: @ValidateNestedType(() => UpdateDTO, { each: true })
//  * Instead of:
//  *    @ValidateNested({ each: true })
//  *    @Type(() => UpdateDTO)
//  */
// export function ValidateNestedType(
//   typeFunction?: () => CallableFunction,
//   validationOptions?: ValidationOptions,
// ): (target: any, key: string) => void {
//   return (target: any, propertyKey: string): void => {
//     ValidateNested(validationOptions)(target, propertyKey);
//     Type(typeFunction)(target, propertyKey);
//   };
// }

// // TODO: Replace @IsString() + @IsNotEmpty with @IsNotEmptyString()
// /**
//  * Makes sure that the string is not empty after trim();
//  * trimmed value replaces original one.
//  * This is used for cases where we create entities and must
//  * not save save extra spaces to avoid confusion later.
//  */
// export function IsNotEmptyString(
//   validationOptions?: ValidationOptions,
// ): (target: any, key: string) => void {
//   return (target: any, propertyKey: string): void => {
//     IsString(validationOptions)(target, propertyKey);

//     IsNotEmpty(validationOptions)(target, propertyKey);
//   };
// }
