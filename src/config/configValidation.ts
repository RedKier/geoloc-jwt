import { ValidationError, validateSync } from 'class-validator';
import { IConfig } from '.';

export const configValidation = (config: IConfig) => {
  const errors = validateSync(config);

  if (errors.length > 0) {
    console.error('Environment setup failed at:');

    for (const error of errors) {
      printError(error);
    }

    process.exit(1);
  }
};

const printError = (error: ValidationError) => {
  if (error.constraints) {
    for (const errorMsg of Object.values(error.constraints)) {
      console.error(` - ${errorMsg}`);
    }
  }

  if (error.children.length > 0) {
    for (const childError of error.children) {
      printError(childError);
    }
  }
};
