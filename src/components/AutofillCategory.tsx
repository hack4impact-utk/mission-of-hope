// import { ItemResponse } from '@/types/items';
// import { Autocomplete, TextField } from '@mui/material';
// import { useState } from 'react';

// interface Item {
//   ItemOptions: ItemResponse[];
//   onCategorySelect: (items: ItemResponse[]) => void;
// }

// export default function AutofillCategory(props: Item) {
//   const [itemOptions] = useState<ItemResponse[]>(props.ItemOptions);

//   function onCategoryChange(value: string) {
//     const categoryMatches = itemOptions.filter(
//       (item) => item.category.toLowerCase() === value.toLowerCase()
//     );
//     if (categoryMatches.length > 0) {
//         console.log(categoryMatches);
//       // Pass selected Item details back to parent component
//       props.onCategorySelect(categoryMatches);
//     }
//   }

//   return (<>
//     <Autocomplete
//       freeSolo
//       autoComplete
//       value={''}
//       options={itemOptions}
//       isOptionEqualToValue={(option, value) => option._id === value._id}
//       getOptionLabel={(item) => (typeof item === 'string' ? item : item.category)}
//       renderOption={(props, option) => {
//         return (
//           <li {...props} key={option._id}>
//             {option.category}
//           </li>
//         );
//       }}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Category"
//           id="outlined-required"
//           value={''}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//             onCategoryChange(e.target.value);
//           }}
//           type="string"
//         />
//       )}
//       onInputChange={(_, value) => {
//         if (value) {
//           onCategoryChange(value);
//         }
//       }}
//     />
//     </>
//   );
// }
