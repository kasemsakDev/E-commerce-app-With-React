import { createSelector } from 'reselect';

const selectDirectory = state => state.directory;

export const selectDirectorySections = createSelector(
    [selectDirectory],
    directory => directory.sections
);

/*
const INTIAL_STATE = {
    sections: data
    }

 result directory.sections

*/
  
 