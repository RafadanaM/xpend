import { IsString } from 'class-validator';

class SearchDto {
  @IsString()
  public search: string;
}
export default SearchDto;