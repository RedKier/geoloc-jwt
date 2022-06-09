import { resolve } from 'path';
import { config } from 'dotenv';
import { ValidateNested } from 'class-validator';

config({ path: resolve(__dirname, '../../.env') });

import { APP, IAppConfig } from "./app.config";
import { configValidation } from './configValidation';

export interface IConfig {
    APP: IAppConfig;
}

class Config implements IConfig {
    @ValidateNested()
    APP = APP;
}



export const CONFIG = new Config();

configValidation(CONFIG);