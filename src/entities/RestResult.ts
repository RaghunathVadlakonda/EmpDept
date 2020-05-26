export class RestResult {

    static readonly REST_RESULT_SUCCESS : string = "Success";
    static readonly REST_RESULT_FAILURE : string = "Failure";
    static readonly ERROR_MESSAGE : string = "Internal Server Error";

    status : string;
    message : string;
    data : any;
}
