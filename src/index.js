import 'core-js/shim';

import '@/app/index';

import Components from '@/app/components/index';

Components.forEach(component => component());
