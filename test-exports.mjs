import * as rp from 'react-resizable-panels';
console.log('ESM Exports keys:', Object.keys(rp));
// Also try named imports
import { Group, Panel, Separator } from 'react-resizable-panels';
console.log('PanelGroup:', typeof Group);
console.log('Panel:', typeof Panel);
console.log('PanelResizeHandle:', typeof Separator);
