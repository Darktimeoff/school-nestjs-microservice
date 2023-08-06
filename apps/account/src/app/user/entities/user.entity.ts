import { IUser, UserRole } from "@school-nestjs/interfaces";
import {genSalt, hash, compare} from 'bcryptjs';
import { Exclude } from "class-transformer";

export class UserEntity implements IUser {
    _id?: string;
    displayName?: string;
    email: string;
    
    @Exclude({
        toPlainOnly: true
    })
    passwordHash: string;
    
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;


    constructor(user: Omit<IUser, 'passwordHash'> & { passwordHash?: string }) {
        this._id = user._id?.toString();
        this.displayName = user.displayName;
        this.email = user.email;
        this.role = user.role;
        this.passwordHash = user.passwordHash;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }

    public async setPassword(password: string) {
        const salt  = await genSalt();
        const saltHash = await hash(password, salt);

        this.passwordHash = saltHash;

        return this;
    }

    public checkPassword(password: string) {
        return compare(password, this.passwordHash);
    }
}