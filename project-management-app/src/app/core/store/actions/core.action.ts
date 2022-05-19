import { createAction, props } from '@ngrx/store';
import { Languages } from '../store.model';

const actionSource = '[Core]';

export const ChangeLanguage = createAction(
  `${actionSource} Change Language Success`,
  props<{ lang: Languages }>(),
);

export const LogoutUserSuccess = createAction(`${actionSource} Logout User Success`);
