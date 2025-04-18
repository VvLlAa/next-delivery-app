import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const filters = ['в пути', 'доставлено', 'отменено'];

interface Filter {
  setSelectedFilter: (selectedFilter: string | null) => void;
}

export const Filter = ({ setSelectedFilter }: Filter) => {
  return (
    <div>
      <Autocomplete
        disablePortal
        options={filters}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Фильтр" />}
        onChange={(event, value) => {
          setSelectedFilter(value);
        }}
      />
    </div>
  );
};
