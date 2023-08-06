import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions, MongooseModuleOptions } from "@nestjs/mongoose";

function getMongoString(configService: ConfigService): string {
    return 'mongodb://' + configService.get('MONGO_LOGIN') 
    + ":" + configService.get('MONGO_PASSWORD') 
    + "@" + configService.get('MONGO_HOST') 
    + ":" + configService.get('MONGO_PORT') 
    + "/" + configService.get('MONGO_DATABASE') 
    + "?authSource=" + configService.get('MONGO_AUTHDATABASE');
}

export function getMongooseConfig(): MongooseModuleAsyncOptions {
    return {
        inject: [ConfigService],
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            uri: getMongoString(configService),
        })
    }
}