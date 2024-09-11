class ApiError extends Error{

    public statusCode:number;

    constructor(statusCode:number,message:string="Something went wrong"){
    
    
    super(message);
    this.statusCode=statusCode;
    
    
    
    }
    
    
    }
    export  {ApiError}