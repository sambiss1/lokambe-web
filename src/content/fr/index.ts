import type {SiteContent} from '../types';
import {about} from './about';
import {apply} from './apply';
import {contact} from './contact';
import {forms} from './forms';
import {governance} from './governance';
import {home} from './home';
import {impact} from './impact';
import {investors} from './investors';
import {legalNotice, privacy} from './legal';
import {model} from './model';
import {investmentProcess} from './process';
import {sectors} from './sectors';

export const fr: SiteContent = {
  home,
  about,
  model,
  process: investmentProcess,
  sectors,
  governance,
  impact,
  apply,
  investors,
  contact,
  forms,
  legalNotice,
  privacy,
};
