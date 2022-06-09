import { IsBoolean, IsEnum, Max, Min } from "class-validator";
import { envToNumber } from "../common/helpers";

export interface IAppConfig {
    NODE_ENV: string;
    PORT: number;
    IS_PRODUCTION: boolean;
    IS_DEVELOPMENT: boolean;
    IS_TEST: boolean;
}

enum EnvEnum {
    Production = 'production',
    Development = 'development',
    Test = 'test',
}

class AppConfig implements IAppConfig {
    @IsEnum(EnvEnum)
    NODE_ENV = process.env.NODE_ENV;

    @Min(0, {
      message: 'APP_PORT must be valid number in range 0-65535',
    })
    @Max(65535, {
      message: 'APP_PORT must be valid number in range 0-65535',
    })
    PORT = envToNumber(process.env.APP_PORT);

    @IsBoolean()
    IS_DEVELOPMENT = process.env.NODE_ENV === EnvEnum.Development;

    @IsBoolean()
    IS_PRODUCTION = process.env.NODE_ENV === EnvEnum.Production;

    @IsBoolean()
    IS_TEST = process.env.NODE_ENV === EnvEnum.Test;
}


export const APP = new AppConfig();