// eslint-disable-next-line max-classes-per-file
export class FullError extends Error {
  code = '000';
  status = 500;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     InternalError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'InternalError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '001'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: 'Internal error. Try again later'
 */
export class InternalError extends FullError {
  constructor() {
    super('Internal error. Try again later');
    this.name = 'InternalError';
    this.code = '001';
    this.status = 500;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrectDataType:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'IncorrectDataType'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '002'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: 'Received request is not json type'
 */
export class IncorrectDataType extends FullError {
  constructor() {
    super('Received request is not json type');
    this.name = 'IncorrectDataType';
    this.code = '002';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     MissingArgError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'MissingArgError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '003'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "^Missing param: .+$"
 */
export class MissingArgError extends FullError {
  constructor(param: string) {
    super(`Missing param: ${param}`);
    this.name = 'MissingArgError';
    this.code = '003';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrectArgError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'IncorrectArgError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '004'
 *         message:
 *           type: string
 *           description: Error message describing the incorrect parameter.
 *           example: 'Data not provided'
 */
export class IncorrectArgError extends FullError {
  constructor(err: string) {
    super(err);
    this.name = 'IncorrectArgError';
    this.code = '004';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     UnauthorizedError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'UnauthorizedError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '005'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           example: 'User not logged in'
 */
export class UnauthorizedError extends FullError {
  constructor() {
    super('User not logged in');
    this.name = 'UnauthorizedError';
    this.code = '005';
    this.status = 401;
  }
}

export class MissingProcessPlatformError extends FullError {
  constructor() {
    super('process.platform is missing');
    this.name = 'MissingProcessPlatformError';
    this.code = '006';
    this.status = 500;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrectBodyTypeError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'IncorrectBodyTypeError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '007'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "Incorrect body type. Data should be of type json"
 */
export class IncorrectBodyTypeError extends FullError {
  constructor() {
    super('Incorrect body type. Data should be of type json');
    this.name = 'IncorrectBodyTypeError';
    this.code = '007';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     NoDataProvidedError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'NoDataProvidedError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '008'
 *         message:
 *           example: 'No data provided'
 *           description: Error message describing the incorrect parameter.
 *           type: string
 */
export class NoDataProvidedError extends FullError {
  constructor() {
    super('No data provided');
    this.name = 'NoDataProvidedError';
    this.code = '008';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrectArgLengthError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'IncorrectArgLengthError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '009'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "^Element has incorrect length: .+$"
 */
export class IncorrectArgLengthError extends FullError {
  constructor(target: string, min: number | undefined, max: number) {
    super(
      min === undefined
        ? `${target} should be less than ${max} characters`
        : min !== max
          ? `${target} should be more than ${min} and less than ${max} characters`
          : `${target} should be ${min} characters`,
    );
    this.name = 'IncorrectArgLengthError';
    this.code = '009';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     IncorrectArgTypeError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'IncorrectArgTypeError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '010'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "^Element has incorrect length: .+$"
 */
export class IncorrectArgTypeError extends FullError {
  constructor(err: string) {
    super(err);
    this.name = 'IncorrectArgTypeError';
    this.code = '010';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     ElementTooShortError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'ElementTooShortError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '011'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "^Element .+$ is too short. Minimum length is .+$"
 */
export class ElementTooShortError extends FullError {
  constructor(target: string, min: number) {
    super(`Element ${target} is too short. Minimum length is ${min}`);
    this.name = 'ElementTooShortError';
    this.code = '011';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     ElementTooLongError:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'ElementTooLongError'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '012'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "^Element .+$ is too long. Maximum length is .+$"
 */
export class ElementTooLongError extends FullError {
  constructor(target: string, min: number) {
    super(`Element ${target} is too long. Maximum length is ${min}`);
    this.name = 'ElementTooShortLongError';
    this.code = '012';
    this.status = 400;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     FourOhFour:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'FourOhFour'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '013'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "Resource not found or is inaccessible for you"
 */
export class FourOhFour extends FullError {
  constructor() {
    super('Resource not found or is inaccessible for you');
    this.name = 'FourOhFour';
    this.code = '013';
    this.status = 404;
  }
}

/**
 * @openapi
 * components:
 *   schemas:
 *     InvalidRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Error name describing the error cause.
 *           example: 'InvalidRequest'
 *         code:
 *           type: string
 *           description: Unique code associated with the error.
 *           example: '013'
 *         message:
 *           type: string
 *           description: Error message describing the error cause.
 *           pattern: "Invalid request. This error means that there was a problem with user provided client data"
 */
export class InvalidRequest extends FullError {
  constructor() {
    super('Invalid request');
    this.name = 'InvalidRequest';
    this.code = '014';
    this.status = 400;
  }
}

export class IncorrectCredentialsError extends FullError {
  constructor(message?: string) {
    super('IncorrectCredentialsError');
    this.message = message ?? 'Incorrect credentials';
    this.name = 'IncorrectCredentialsError';
    this.code = '005';
    this.status = 400;
  }
}

export class UserAlreadyRegisteredError extends FullError {
  constructor() {
    super('UserAlreadyRegisteredError');
    this.message = 'Email already registered';
    this.name = 'UserAlreadyRegisteredError';
    this.code = '006';
    this.status = 400;
  }
}

export class UsernameAlreadyInUseError extends FullError {
  constructor() {
    super('UsernameAlreadyInUseError');
    this.message = 'Selected username is already in use';
    this.name = 'UsernameAlreadyInUseError';
    this.code = '007';
    this.status = 400;
  }
}

export class ProfileAlreadyInitializedError extends FullError {
  constructor() {
    super('ProfileAlreadyInitializedError');
    this.message = 'Profile already initialized';
    this.name = 'ProfileAlreadyInitializedError';
    this.code = '008';
    this.status = 400;
  }
}

export class NotConnectedError extends FullError {
  constructor() {
    super('NotConnectedError');
    this.message = 'Rabbit is not connected';
    this.name = 'NotConnectedError';
    this.code = '011';
    this.status = 500;
  }
}

export class UserDoesNotExist extends FullError {
  constructor() {
    super('UserDoesNotExist');
    this.message = 'Selected user does not exist';
    this.name = 'UserDoesNotExist';
    this.code = '012';
    this.status = 400;
  }
}

export class InventoryDoesNotExist extends FullError {
  constructor() {
    super('InventoryDoesNotExist');
    this.message = 'Selected inventory does not exist';
    this.name = 'InventoryDoesNotExist';
    this.code = '015';
    this.status = 400;
  }
}

export class ItemNotInInventory extends FullError {
  constructor() {
    super('ItemNotInInventory');
    this.message = 'Selected item does not exist in your inventory';
    this.name = 'ItemNotInInventory';
    this.code = '016';
    this.status = 400;
  }
}

export class InsufficientAmount extends FullError {
  constructor() {
    super('InsufficientAmount');
    this.message = 'Insufficient amount of items in inventory';
    this.name = 'InsufficientAmount';
    this.code = '017';
    this.status = 400;
  }
}

export class PartyAlreadyExists extends FullError {
  constructor() {
    super('PartyAlreadyExists');
    this.message = 'Party already exists';
    this.name = 'PartyAlreadyExists';
    this.code = '018';
    this.status = 400;
  }
}

export class ProfileDoesNotExists extends FullError {
  constructor() {
    super('ProfileDoesNotExists');
    this.message = 'Profile does not exist';
    this.name = 'ProfileDoesNotExists';
    this.code = '019';
    this.status = 400;
  }
}

export class PartyDoesNotExist extends FullError {
  constructor() {
    super('PartyDoesNotExist');
    this.message = 'Party does not exist';
    this.name = 'PartyDoesNotExist';
    this.code = '020';
    this.status = 400;
  }
}

export class NoUser extends FullError {
  constructor() {
    super('NoUser');
    this.message = 'No user with provided id';
    this.name = 'NoUser';
    this.code = '023';
    this.status = 400;
  }
}

export class SingleSkillDoesNotExist extends FullError {
  constructor() {
    super('SingleSkillDoesNotExist');
    this.message = 'Selected skill does not exist';
    this.name = 'SingleSkillDoesNotExist';
    this.code = '024';
    this.status = 400;
  }
}

export class SingleSkillPresent extends FullError {
  constructor() {
    super('SingleSkillPresent');
    this.message = 'Selected skill is already present in skills';
    this.name = 'SingleSkillPresent';
    this.code = '025';
    this.status = 400;
  }
}

export class IncorrectTargetError extends FullError {
  constructor() {
    super('IncorrectTargetError');
    this.message = 'Incorrect data target';
    this.name = 'IncorrectTargetError';
    this.code = '026';
    this.status = 400;
  }
}

export class UnregisteredControllerError extends FullError {
  constructor(target: string) {
    super(`Controllers with target ${target} were not registered !`);
    this.name = 'UnregisteredControllerError';
    this.code = '027';
    this.status = 500;
  }
}

export class NoPermission extends FullError {
  constructor() {
    super('You have no permission to make that action');
    this.name = 'NoPermission';
    this.code = '028';
    this.status = 400;
  }
}
