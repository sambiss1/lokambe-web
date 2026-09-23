import type {SiteContent} from '../types';
import {about} from './about';
import {apply} from './apply';
import {contact} from './contact';
import {forms} from './forms';
import {home} from './home';
import {impact} from './impact';
import {legalNotice, privacy} from './legal';
import {model} from './model';
import {sectors} from './sectors';

export const fr: SiteContent = {
  home,
  about,
  model,
  sectors,
  impact,
  apply,
  contact,
  forms,
  legalNotice,
  privacy,
};
