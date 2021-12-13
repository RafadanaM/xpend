import { IsString } from 'class-validator';

class SearchDto {
  @IsString()
  public search: string;
<<<<<<< HEAD

  @IsString()
  public date: string;
=======
>>>>>>> 75f28135a1b0b8c000be6d9e5cfb2f9b10c10740
}
export default SearchDto;