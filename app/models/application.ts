import { Model, Prop, Record } from "app/core";

export interface ApplicationAttributes {
    id: string;
    name: string;
    description: string;
}

/**
 * Class for displaying Batch application information.
 */
@Model()
export class Application extends Record<ApplicationAttributes> {
    @Prop() public id: string;
    @Prop() public name: string;
    @Prop() public description: string;
}
