declare module 'wj-password-validator' {
  export interface PasswordValidatorOptions {
    minLength?: number;
    uppercase?: boolean;
    lowercase?: boolean;
    digits?: boolean;
    specialChar?: boolean;
  }

  export function createPasswordRegex(options: PasswordValidatorOptions): string;
  export function createEmailRegex(): RegExp;
  export function createPhoneNumberRegex(): RegExp;
  export function createDateRegex(): RegExp;
}
