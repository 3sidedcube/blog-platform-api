import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./service";
import { LoginInput, LoginResponse } from "./dto/login";
import { RegisterInput, RegisterResponse } from "./dto/register";
import { UnauthorizedException } from "@nestjs/common";

@Resolver()
export class AuthResolver{
    constructor(private authService: AuthService){}
    @Mutation(()=>RegisterResponse)
    async register(
        @Args('request') input:RegisterInput){
        return this.authService.register(input.name, input.email, input.password)
    }
    @Mutation(()=>LoginResponse)
    async login(
        @Args('request')input: LoginInput){
        const user = await this.authService.validateUser(input.email,input.password)
        if(!user){
          throw new UnauthorizedException('Invalid credentials')
        }
        return this.authService.login(user);
    }
    @Query(()=>String)
    async healthChck(){
        return "This is the health check"
    }
}