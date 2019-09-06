import 'core-js/shim';

import './styles/styles.scss';

import Components from '@/app/components/index';

Components.forEach(component => component());
