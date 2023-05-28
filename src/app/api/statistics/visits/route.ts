import mysql, { OkPacket } from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";
import { IAPIResponse } from '@/interfaces/api.types';


let connectionParams = {
    host: process.env.host,
    port: process.env.port ? parseInt(process.env.port) : 3306,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  } 

let response: IAPIResponse = {
    returnedStatus: 0,
    internalStatus: 0,
    error: null,
    data: null
}

export async function GET(request: NextRequest) {

    let pageName = request.nextUrl.searchParams.get('pageName');
    let newVisit = request.nextUrl.searchParams.get('newVisit');

    console.log('params: ', { pageName, newVisit });
    
    try {
        // connect to database
        const connection = await mysql.createConnection(connectionParams);

        
        // create a query to fetch all expenses
        let get_exp_query = "";
        let values: any[] = [];
        
        if (newVisit && parseInt(newVisit) == 1) {
            get_exp_query = "UPDATE statistics SET visits =  visits + 1 WHERE pagename = ?";
            values = [ pageName ];
                 
            // exec the query and retrieve the results
            const [ results ] = await connection.execute(get_exp_query, values);

            // if((results as mysql.ResultSetHeader).changedRows == 1) {
            //     response.error
        }
        
        // console.log("changedRows: ", (results as mysql.ResultSetHeader).changedRows);


        get_exp_query = "SELECT * FROM statistics WHERE pagename = '" + pageName + "'";
            
        const [ results ] = await connection.execute(get_exp_query, values);

        console.log('results: ', results);
        response.data = results;        

        connection.end();

        // response.data = results;

        // return the results as a JSON API response
        return NextResponse.json(response);
    } catch (err) {
        console.log('ERROR: API - ', (err as Error).message);
        
        response.error = (err as Error).message;
        
        response.returnedStatus = 200;
        response.data = [];
        return NextResponse.json(response, { status: 200 });
    }
}


export async function POST(request: NextRequest) {
    // get any passed parameters
    const body = await request.json();

    console.log(body);

    let pageName = body.pageName;
    let ip = body.ip;

    // console.log('pagename = ', pageName);
    try {
        // connect to database
        // const connection = await mysql.createConnection(connectionParams);

        
        // // create a query to fetch all expenses
        // let get_exp_query = "";
        // let values: any[] = [];
        
        // get_exp_query = "UPDATE statistics SET visits =  visits + 1 WHERE pagename = ?";
        // values = [ pageName ];
             
        // exec the query and retrieve the results
        // const [ results ] = await connection.execute(get_exp_query, values);
        
        // console.log("changedRows: ", (results as mysql.ResultSetHeader).changedRows);

        // if((results as mysql.ResultSetHeader).changedRows == 1) {
        //     get_exp_query = "SELECT visits FROM statistics WHERE pagename = ?";
            
        //     const [ results2 ] = await connection.execute(get_exp_query, values);
        //     console.log('Results: ', results2);

        //     response.data = results2;

        // } else {
        //     response.error = "Something went wrong! Can't track the visit.";
        //     response.data = {};
        // }
        

        // connection.end();

        // response.data = results;

        // return the results as a JSON API response
        return NextResponse.json(response);
    } catch (err) {
        console.log('ERROR: API - ', (err as Error).message);
        
        response.error = (err as Error).message;
        
        response.returnedStatus = 200;
        response.data = [];
        return NextResponse.json(response, { status: 200 });
    }


}