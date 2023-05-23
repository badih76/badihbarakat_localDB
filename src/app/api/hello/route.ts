import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server";

let connectionParams = {
  host: process.env.host,
  port: process.env.port ? parseInt(process.env.port) : 3306,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
}


export async function GET(request: Request) {
  // return new Response('Hello, Next.js!')
  try {
    // connect to database
    const connection = await mysql.createConnection(
    //   {
    //     host, //: 'containers-us-west-53.railway.app', // 'localhost',
    //     port,
    //     user, //: 'root',
    //     password, //: 'D2JeDWNtMrfj1BbO8RfQ', //'Malmak-101',
    //     database  //: 'railway', //'budgex'
    // }
    connectionParams);

    
    // create a query to fetch all expenses
    let get_exp_query = "";
     
    get_exp_query = 'SELECT * FROM statistics';
    
    // exec ute the query and retrieve the results
    let values: [] = [];


    const [ results ] = await connection.execute(get_exp_query, values);
    connection.end();

    console.log(results);

    // return the results as a JSON API response
    // return NextResponse.json({});
    return NextResponse.json(results);
  } catch (err) {
      console.log('ERROR: API - ', (err as Error).message);
      
      return NextResponse.json(err, { status: 200 });
  }
}
