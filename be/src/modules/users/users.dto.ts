import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

class createUserDto {
  @IsString()
  @MinLength(2)
  public first_name: string;

  @IsString()
  @MinLength(2)
  public last_name: string;

  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
  public password: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  public confirm_password: string;
}
export default createUserDto;
