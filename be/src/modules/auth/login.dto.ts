import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

class LoginDto {
  @IsEmail()
  public email: string;

  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  public password: string;
}

export default LoginDto;
