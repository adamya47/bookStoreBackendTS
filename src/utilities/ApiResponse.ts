class ApiResponse<T> {

    public statusCode:number;
    public data:T; //cause data can be anything string ,array,so according to that use new ApiResponse<string> or<number[]> or anything depending on the data
    public message:string;
    public success:boolean;


constructor(statusCode:number,data:T,message:string="Successfully done"){

    this.statusCode=statusCode;
    this.data=data;
    this.message=message;
    this.success=statusCode<400;

}


}

export {ApiResponse}