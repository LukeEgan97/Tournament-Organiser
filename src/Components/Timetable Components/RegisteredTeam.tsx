import React from "react";
import Pool from "./Pool";


class RegisteredTeam extends React.Component{
    name: string;
    seeding: number;
    pool: Pool;

    constructor(props: any){
        super(props);
        this.name=props.name;
        this.seeding = props.seeding;
        this.pool = props.pool;

        //Register Team to Tournament here
    }
}