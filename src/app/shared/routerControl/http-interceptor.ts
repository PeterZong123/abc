import { Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-interceptors';

export class ServerURLInterceptor implements Interceptor {
    public interceptBefore(request: InterceptedRequest): InterceptedRequest {
        // 修改请求
      console.log("intercept url:"+request.url);
      return request; 
    }
    public interceptAfter(response: InterceptedResponse): InterceptedResponse {
        return response;
    }

}