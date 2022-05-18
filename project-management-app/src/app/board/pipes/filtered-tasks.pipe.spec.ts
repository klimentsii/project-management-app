import { FilteredTasksPipe } from './filtered-tasks.pipe';

describe('FilteredTasksPipe', () => {
  it('create an instance', () => {
    const pipe = new FilteredTasksPipe();
    expect(pipe).toBeTruthy();
  });
});
