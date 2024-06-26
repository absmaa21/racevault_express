import {IUser, IUserRace} from "../public/types";
import mongoose from "mongoose";

const ObjectId = require("mongoose").ObjectId

const userRaceSchema = new mongoose.Schema<IUserRace>({
    game: {type: String, required: true},
    event: {type: String, required: true},
    circuit: {type: String, required: true},
    vehicle: {type: String, required: true},
    start_date: {type: Number, required: true},
    duration: {type: Number, required: true},
    position_qualifying_overall: {type: Number, required: true},
    position_race_overall: {type: Number, required: true},
    position_qualifying_class: {type: Number, required: false},
    position_race_class: {type: Number, required: false},
});

const userSchema = new mongoose.Schema<IUser>({
    email: {type: String, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    picture: {type: String, required: true},
    last_login: {type: Number},
    register_date: {type: Number, required: true, default: Date.now()},
    races: {type: [userRaceSchema], required: true, default: []},
});

export function getUserWithoutPassword(user: any) {
    return {
        id: user._id,
        email: user.email,
        username: user.username,
        picture: user.picture,
        last_login: user.last_login,
        register_date: user.register_date,
        num_of_races: user.races.length,
    }
}

const User  = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User
