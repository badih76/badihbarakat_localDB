import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";
import { IAPIResponse } from '@/interfaces/api.types';


let connectionParams = {
    host: process.env.host,
    port: process.env.port ? parseInt(process.env.port) : 3306,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  } 

export async function GET(request: Request) {
    let response: IAPIResponse = {
        returnedStatus: 0,
        internalStatus: 0,
        error: null,
        data: null
    }

    try {
        // connect to database
        const connection = await mysql.createConnection(connectionParams);

        
        // create a query to fetch all expenses
        let post_exp_query = "";
        let values: any[] = [];
        
        post_exp_query = "SELECT COUNT(*) SubscriptionsCount FROM subscriptions";
             
        // exec the query and retrieve the results
        const [ results ] = await connection.execute(post_exp_query, values);

        connection.end();

        response.data = results;

        // return the results as a JSON API response
        return NextResponse.json(response, {
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }});
    } catch (err) {
        console.log('ERROR: API - ', (err as Error).message);
        
        response.error = (err as Error).message;
        
        response.returnedStatus = 200;
        response.data = [];
        return NextResponse.json(response, { status: 200, headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }});
    }
}


export async function POST(request: NextRequest) {
    // get any passed parameters
    const body = await request.json();

    // console.log(body);

    let payload = body.payload;

    let response: IAPIResponse = {
        returnedStatus: 0,
        internalStatus: 0,
        error: null,
        data: null
    }

    try {
        // connect to database
        const connection = await mysql.createConnection(connectionParams);

        
        // create a query to fetch all expenses
        let post_exp_query = "";
        let values: any[] = [];
        const {email} = payload;

        post_exp_query = "INSERT INTO subscriptions (email) VALUES (?)";
                
        values = [email]

        // exec the query and retrieve the results
        const [ results ] = await connection.execute(post_exp_query, values);

        connection.end();

        response.data = results;

        // return the results as a JSON API response
        return NextResponse.json(response, {
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }});
    } catch (err) {
        console.log('ERROR: API - ', (err as Error).message);
        
        response.error = (err as Error).message;
        
        response.returnedStatus = 200;
        response.data = [];
        return NextResponse.json(response, { status: 200, 
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }});
    }


}