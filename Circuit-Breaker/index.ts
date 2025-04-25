// Three states in which a CB can be in
enum CircuitBreakerState {
    OPEN,
    CLOSED,
    HALFOPEN
}

// Optional params a user can input while initializing the CB
interface CircuitBreakerOptions {
    failureThreshold?: number; 
    resetTimeout? :number
    halfOpenMaxAllowed: number;
}

// This is the main class which export the Circuit Breaker
export class CirucuitBreaker {
    private state: CircuitBreakerState = CircuitBreakerState.CLOSED;
    private failureThreshold : number;
    private failureCount: number = 0;
    private resetTimeout: number;
    private lastFailureTime: number = 0;
    private halfOpenMaxAllowed: number;
    private halfOpenRequests: number = 0;

    constructor(options: CircuitBreakerOptions = {} ){
        this.failureThreshold = options.failureThreshold ?? 5
        this.resetTimeout = options.resetTimeout ?? 30000;
        this.halfOpenMaxAllowed = options.halfOpenMaxAllowed ?? 1;

    }

    // This function will execute any function that the comes to be executed
    async execute<T>(fn : () => Promise<T>): Promise<T> {       
        if(!this.allowRequest()){
            return Promise.reject(new Error("Circuit breaker is open"))
        }

        try{
            const result = await fn();
            this.handleRequest(true);
            return result;
        }catch(e){
            this.handleRequest(false);
            throw e;
        }
    }


    private handleRequest(success:boolean) :void {
        switch(this.state){
            case CircuitBreakerState.CLOSED:
                if(!success){
                    this.failureCount++;
                    if(this.failureCount >= this.failureThreshold){
                        this.state = CircuitBreakerState.OPEN;
                        this.lastFailureTime = Date.now();
                    }
                }else{
                    this.failureCount = 0;
                }
                break;

            case CircuitBreakerState.HALFOPEN:
                this.halfOpenRequests++;
                if(!success){
                    this.state = CircuitBreakerState.OPEN;
                    this.lastFailureTime = Date.now();

                }else if (this.halfOpenRequests >= this.halfOpenMaxAllowed){
                    this.state = CircuitBreakerState.CLOSED
                    this.failureCount = 0;

                }
                break;
        }
    }


    private allowRequest(): boolean {
        switch(this.state){
            case CircuitBreakerState.CLOSED:
                return true;
            case CircuitBreakerState.OPEN:
                if(Date.now() - this.lastFailureTime > this.resetTimeout){
                    this.transitionToHalfOpen();
                    return true;
                }
                return false;
            case CircuitBreakerState.HALFOPEN:
                return this.halfOpenRequests < this.halfOpenMaxAllowed;
            default:
                return false
        }
    }


    private transitionToHalfOpen(): void {
        if(this.state === CircuitBreakerState.OPEN){
            this.state = CircuitBreakerState.HALFOPEN;
            this.halfOpenRequests = 0;
        }
    }

    getState(): CircuitBreakerState {
        return this.state
    }

    forceOpen(): void {
        this.state = CircuitBreakerState.OPEN
    }

    forceClose() :void {
        this.state = CircuitBreakerState.CLOSED
    }
}

